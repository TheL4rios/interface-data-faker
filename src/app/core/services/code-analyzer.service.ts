import { Injectable } from '@angular/core';
import { Comment } from '../enums/comment.enum';
import { SearchInterfaceService } from './search-interface.service';

@Injectable({
	providedIn: 'root'
})
export class CodeAnalyzerService {

	private limiters = '\n\t {}[]*+/-;:()=><!';
	private _initialCode = `/* 
	Example of interface to generate fake data.
	
	You can use specific types with enum "Types" for example:
	 *Types.MOVIE
	 *Types.PRICE
	 *Types.USER_NAME
	 *Types.MONTH
*/

interface Book {
  name: Types.BOOK;
  pages: number;
  author: Author;
}

interface Author {
  name: Types.FULL_NAME;
  age: Types.AGE;
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

		for (const letter of code) {
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
