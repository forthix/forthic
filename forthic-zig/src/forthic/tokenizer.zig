const std = @import("std");
const token = @import("token.zig");

pub fn getNumber() u8 {
    return 42;
}

const TokenizerError = error{UnterminatedStringError};

pub const Tokenizer = struct {
    input_string: []const u8,
    position: u32,
    whitespace: []const u8,
    quote_chars: []const u8,
    token_string: std.ArrayList(u8),
    allocator: std.mem.Allocator,

    pub fn deinit(self: *Tokenizer) void {
        self.token_string.deinit();
    }

    pub fn nextToken(self: *Tokenizer) error{ OutOfMemory, UnterminatedStringError }!token.Token {
        self.token_string.clearRetainingCapacity();
        return self.transitionFromSTART();
    }

    fn isWhitespace(self: *Tokenizer, c: u8) bool {
        return std.mem.indexOfScalar(u8, self.whitespace, c) != null;
    }

    fn isQuote(self: *Tokenizer, c: u8) bool {
        return std.mem.indexOfScalar(u8, self.quote_chars, c) != null;
    }

    fn isTripleQuote(self: *Tokenizer, position: u32, c: u8) bool {
        if (!self.isQuote(c)) {
            return false;
        }
        if (position + 2 < self.input_string.len) {
            return self.input_string[position] == c and self.input_string[position + 1] == c and self.input_string[position + 2] == c;
        }
        return false;
    }

    fn isStartMemo(self: *Tokenizer, position: u32) bool {
        if (position + 1 < self.input_string.len) {
            return self.input_string[position] == '@' and self.input_string[position + 1] == ':';
        }
        return false;
    }

    fn transitionFromSTART(self: *Tokenizer) error{ OutOfMemory, UnterminatedStringError }!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            self.position += 1;
            if (self.isWhitespace(c)) {
                continue;
            } else if (c == '#') {
                return self.transitionFromCOMMENT();
            } else if (c == ':') {
                return self.transitionFromSTART_DEFINITION();
            } else if (self.isStartMemo(self.position - 1)) {
                self.position += 1; // Skip over ":" in "@:"
                return self.transitionFromSTART_MEMO();
            } else if (c == ';') {
                return token.createToken(token.TokenType.tok_end_definition, ";", self.allocator);
            } else if (c == '[') {
                return token.createToken(token.TokenType.tok_start_array, "[", self.allocator);
            } else if (c == ']') {
                return token.createToken(token.TokenType.tok_end_array, "]", self.allocator);
            } else if (c == '{') {
                return self.transitionFromGATHER_MODULE();
            } else if (c == '}') {
                return token.createToken(token.TokenType.tok_end_module, "}", self.allocator);
            } else if (self.isTripleQuote(self.position - 1, c)) {
                self.position += 2; // Skip over 2nd and 3rd quote characters
                return self.transitionFromGATHER_TRIPLE_QUOTE_STRING(c);
            }
        }
        return token.createToken(token.TokenType.tok_eos, "", self.allocator);
    }

    fn transitionFromCOMMENT(self: *Tokenizer) error{OutOfMemory}!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            self.position += 1;
            if (c == '\n') {
                break;
            }
        }
        return token.createToken(token.TokenType.tok_comment, self.token_string.items, self.allocator);
    }

    fn transitionFromSTART_DEFINITION(self: *Tokenizer) error{OutOfMemory}!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            self.position += 1;
            if (self.isWhitespace(c)) {
                break;
            }
            try self.token_string.append(c);
        }
        return token.createToken(token.TokenType.tok_start_definition, self.token_string.items, self.allocator);
    }

    fn transitionFromSTART_MEMO(self: *Tokenizer) error{OutOfMemory}!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            self.position += 1;
            if (self.isWhitespace(c)) {
                break;
            }
            try self.token_string.append(c);
        }
        return token.createToken(token.TokenType.tok_start_memo, self.token_string.items, self.allocator);
    }

    fn transitionFromGATHER_MODULE(self: *Tokenizer) error{OutOfMemory}!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            self.position += 1;
            if (self.isWhitespace(c)) {
                break;
            } else if (c == '}') {
                self.position -= 1;
                break;
            } else {
                try self.token_string.append(c);
            }
        }
        return token.createToken(token.TokenType.tok_start_module, self.token_string.items, self.allocator);
    }

    fn transitionFromGATHER_TRIPLE_QUOTE_STRING(self: *Tokenizer, quote_char: u8) error{ OutOfMemory, UnterminatedStringError }!token.Token {
        while (self.position < self.input_string.len) {
            const c = self.input_string[self.position];
            if (c == quote_char and self.isTripleQuote(self.position, c)) {
                self.position += 3;
                return token.createToken(token.TokenType.tok_string, self.token_string.items, self.allocator);
            } else {
                self.position += 1;
                try self.token_string.append(c);
            }
        }
        return TokenizerError.UnterminatedStringError;
    }

    pub fn printInput(self: *Tokenizer) void {
        std.debug.print("Input: {s}\n", .{self.input_string[0..1]});
    }
};

pub fn createTokenizer(input_string: []const u8, allocator: std.mem.Allocator) Tokenizer {
    return Tokenizer{
        .input_string = input_string,
        .position = 0,
        .whitespace = " \t\n\r()",
        .quote_chars = "\"'",
        .token_string = std.ArrayList(u8).init(allocator),
        .allocator = allocator,
    };
}

test "Parse comment" {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer {
        const deinit_status = gpa.deinit();
        //fail test; can't try in defer as defer is executed after we return
        if (deinit_status == .leak) std.testing.expect(false) catch @panic("TEST FAIL");
    }

    const forthic =
        \\# This is a comment
        \\: MESSAGE
        \\@: MESSAGE
        \\;
        \\[
        \\]
        \\{test-module
        \\}
        \\"""This is a triple quote string"""
        \\'''Another triple quote string'''
    ;
    const expected_types = [_]token.TokenType{
        token.TokenType.tok_comment,
        token.TokenType.tok_start_definition,
        token.TokenType.tok_start_memo,
        token.TokenType.tok_end_definition,
        token.TokenType.tok_start_array,
        token.TokenType.tok_end_array,
        token.TokenType.tok_start_module,
        token.TokenType.tok_end_module,
        token.TokenType.tok_string,
        token.TokenType.tok_string,
    };

    var tokenizer = createTokenizer(forthic, allocator);
    defer tokenizer.deinit();

    for (expected_types) |expected_type| {
        var tok = try tokenizer.nextToken();
        defer tok.deinit();
        std.debug.print("Token: {any} {any}\n", .{ tok.token_type, expected_type });
        std.testing.expect(tok.token_type == expected_type) catch @panic("TEST FAIL");
    }
}
