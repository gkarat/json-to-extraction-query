/*enum PathItemVariant {
    WILDCARD = "WILDCARD",
    MULTISELECT = "MULTISELECT",
    SELECT = "SELECT",
}

type PathItem = {
    value: string;
    variant: PathItemVariant,
    columnName?: string | string[]; // if defined, the values will go to the result table under the column named with "columnName"
}

type Path = {
    items: PathItem[];
}

type OutputQuery = {
    paths: Path[];
}
*/
// Reprentation of the "root/abc/*/[A, B]" path
/*export const example: OutputQuery = {
    paths: [
        {
            items: [
                {
                    value: 'root',
                    variant: PathItemVariant.SELECT
                },
                {
                    value: 'abc',
                    variant: PathItemVariant.SELECT,
                    columnName: 'abc'
                },
                {
                    value: '*',
                    variant: PathItemVariant.WILDCARD
                },
                {
                    value: '[A, B]',
                    variant: PathItemVariant.MULTISELECT,
                    columnName: ['A', 'B']
                },
            ]
        }
    ],
}

export default OutputQuery;*/