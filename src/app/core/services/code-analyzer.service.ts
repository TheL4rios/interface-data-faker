import { Injectable } from '@angular/core';
import { Comment } from '../enums/comment.enum';
import { KeyWord } from '../enums/key-words.enum';
import { SearchInterfaceService } from './search-interface.service';

@Injectable({
	providedIn: 'root'
})
export class CodeAnalyzerService {

	private limiters = '\n\t {}[]*+/-;:()=><!';
	private _initialCode = `// Example of interface to generate fake data

interface Book {
  name: string;
  pages: number;
  author: Author;
}

interface Author {
  name: string;
  age: number;
}
  `;

	constructor(
		private searchInterfaceService: SearchInterfaceService
	) { }

	getInitialCode(): string {
		return this._initialCode;
	}

	analyzeCode(code: string) {
		const tokens = this._extractCommencts(this._getTokens(code));
		const interfaces = this.searchInterfaceService.getInterfaces(tokens);
		return interfaces;
	}

	private _getTokens(code: string): string[] {
		let word = '';

		const tokens = [];

		for (let i = 0; i < code.length; i++) {
			const letter = code[i];

			if (this.limiters.includes(letter)) {
				if (!!word.trim()) {
					tokens.push(word);
				}
				
				if (letter == '\n' || !!letter.trim()) {
					tokens.push(letter);
				}
				word = '';
			} else {
				word += letter;
			}
		}

		return tokens;
	}

	private _extractCommencts(tokens: string[]): string[] {
		const cleanTokens = [];

		for (let i = 0; i < tokens.length; i++) {
			let token = tokens[i];
			const symbolComment = token + tokens[i + 1];
			if ([Comment.SINGLE_LINE_COMMENT, Comment.MULTI_LINE_COMMENT_START].includes((symbolComment) as Comment)) {
				if (symbolComment == Comment.SINGLE_LINE_COMMENT) {
					while(!!token && token != '\n') {
						i++;
						token = tokens[i];
					}
				} else if (symbolComment == Comment.MULTI_LINE_COMMENT_START) {
					while(!!token && token != Comment.MULTI_LINE_COMMENT_END) {
						i++;
						token = tokens[i] + tokens[i + 1];
					}
				}
			}

			if (!!token.trim()) {
				cleanTokens.push(token);
			}
		}

		return cleanTokens;
	}
}