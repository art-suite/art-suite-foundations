# ArtFuzzySearch

Easy, fast, fuzzy text search.

The primary use-case for ArtFuzzySearch is to quickly filter a list of items as you type, and to do it in flexible way so you catch odd spellings and type-os and other inconsistencies. The key to success is speed and, together with a good UX, interactively showing the results as the user types and edits their search string.

> It works similar to VSCode and SublimeText's file-search. The order of the letters matter, but there can be missing letters or skipped letters.


# Example

Basic example:

```javascript
let {fuzzySearch} = require("@art-suite/art-fuzzy-search");

let result = fuzzySearch(
  "sord",     // searchString
  [           // searchData
    "Sally Ford",
    "John Goodall",
    "Swordmaster Smith"
  ]
)

/*
result: [     // filtered and sorted searchData
  "Swordmaster Smith",
  "Sally Ford"
];
*/

```

More complex example:

```javascript
let {fuzzySearch} = require("@art-suite/art-fuzzy-search");

let result = fuzzySearch(
  "fz",       // searchString
  [           // searchData
    ["I love food"],
    "fz - just a string is OK too",
    ["I find pizza appealing", 123, true],
    ["I fuzzbuzz", "any extra data", "is returned unchanged"]
  ]
)

/*
result: [     // filtered and sorted searchData
  "fz - just a string is OK too",
  ["I fuzzbuzz", "any extra data", "is returned unchanged"],
  ["I find pizza appealing", 123, true]
];
*/

```

# API

```javascript
let {fuzzySearch} = require("@art-suite/art-fuzzy-search");

fuzzySearch(searchString, searchData) => filteredAndSortedSearchData
```

- **IN**: `(searchString, searchData)`

  - searchString: an String to search for
  - searchData: `[searchDataRecord, ...]` (an Array of searchDataRecords)

- **OUT**: searchData, filtered and sorted by best-matches

- **searchDataRecord**: `[searchInString, arbitraryData...]`
  - searchDataRecords can be just a searchInString or an array
  - only the first element is used by fuzzySearch
  - searchInString: arbitrary String which is tested to see if it matches the provided searchString; the quality of the match is also considered and used for the final sort of the returned searchData
  - arbitraryData: if searchInString matches, the entire searchDataRecord will be returned, untouched - including any arbitrary data included after searchInString. Use these additional slots to pass through any additional data you need. e.g. a JSON object of the record or just the record's ID.

Note that fuzzySearch is very forgiving. The only requirement for a match is that the characters of the searchString exist in the searchInString (case insensitively), in the same order, but possibly with any number of characters in between:

> Example: If searchString == 'dog', then the string "I did a lot of great work." *will match*: "I **D**id a l**O**t of **G**reat work."

The key is the results will be sorted based on the quality of the match - best match first. The main sorting criterias is the length of the match. Sorter matches are preferred. For more details, see the [Algorithm Notes](#algorithm-notes) below.

# Algorithm Notes

Basic algorithm:

1. Filter out all search-texts that don't match:
    - all letters from the search string must be present and in the same order in the search text
    - However, they don't have to match case and they can optionally match search-text with extra characters in between. e.g. "fz" will match "Fun zoo" since "f" and "z" are in order even though "un " is in between.
2. Sort the results by result-quality which is determined by
    - length of match; shorter is preferred
    - case sensitive matches are preferred
    - matches closer to the beginning of the search-text are preferred
