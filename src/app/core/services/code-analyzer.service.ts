import { Injectable } from '@angular/core';
import { Comment } from '../enums/comment.enum';
import { SearchInterfaceService } from './search-interface.service';

@Injectable({
	providedIn: 'root'
})
export class CodeAnalyzerService {

	private regexToRemoveComments = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
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
		const tokens = this._getTokens(code.replace(this.regexToRemoveComments, ''));
		const interfaces = this.searchInterfaceService.getInterfaces(tokens);
		return interfaces;
	}

	private _getTokens(code: string): string[] {
		let word = '';

		const tokens = [];

		for (const letter of code) {
			if (letter == '\n') {
				continue;
			}

			if (this.limiters.includes(letter)) {
				if (!!word.trim()) {
					tokens.push(word);
				}
				
				if (!!letter.trim()) {
					tokens.push(letter);
				}
				word = '';
			} else {
				word += letter;
			}
		}

		return tokens;
	}
}
