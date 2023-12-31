// Stores information about the current content of the user's selection

export default class SelectionFormatting {
	public bolded = false;
	public italicized = false;
	public inChecklist = false;
	public inCode = false;
	public inUnorderedList = false;
	public inOrderedList = false;
	public inMath = false;
	public inLink = false;
	public spellChecking = false;
	public unspellCheckableRegion = false;

	// Link data, both fields are null if not in a link.
	public linkData: { linkText?: string; linkURL?: string } = {
		linkText: null,
		linkURL: null,
	};

	// If [headerLevel], [listLevel], etc. are zero, then the
	// selection isn't in a header/list
	public headerLevel = 0;
	public listLevel = 0;

	// Content of the selection
	public selectedText = '';

	// List of data properties (for serializing/deseralizing)
	private static propNames: string[] = [
		'bolded', 'italicized', 'inChecklist', 'inCode',
		'inUnorderedList', 'inOrderedList', 'inMath',
		'inLink', 'linkData',

		'headerLevel', 'listLevel',

		'selectedText',

		'spellChecking',
		'unspellCheckableRegion',
	];

	// Returns true iff [this] is equivalent to [other]
	public eq(other: SelectionFormatting): boolean {
		// Cast to Records to allow usage of the indexing ([])
		// operator.
		const selfAsRec = this as Record<string, any>;
		const otherAsRec = other as Record<string, any>;

		for (const prop of SelectionFormatting.propNames) {
			if (selfAsRec[prop] !== otherAsRec[prop]) {
				return false;
			}
		}

		return true;
	}

	public static fromJSON(json: string): SelectionFormatting {
		const result = new SelectionFormatting();

		// Casting result to a Record<string, any> lets us use
		// the indexing [] operator.
		const resultRecord = result as Record<string, any>;
		const obj = JSON.parse(json) as Record<string, any>;

		for (const prop of SelectionFormatting.propNames) {
			if (obj[prop] !== undefined) {
				// Type checking!
				if (typeof obj[prop] !== typeof resultRecord[prop]) {
					throw new Error([
						'Deserialization Error:',
						`${obj[prop]} and ${resultRecord[prop]}`,
						'have different types.',
					].join(' '));
				}

				resultRecord[prop] = obj[prop];
			}
		}

		return result;
	}

	public toJSON(): string {
		const resultObj: Record<string, any> = {};

		// Cast this to a dictionary. This allows us to use
		// the indexing [] operator.
		const selfAsRecord = this as Record<string, any>;

		for (const prop of SelectionFormatting.propNames) {
			resultObj[prop] = selfAsRecord[prop];
		}

		return JSON.stringify(resultObj);
	}
}
