import fs from "fs/promises";

import {
    Document,
    Packer,
    Paragraph,
    HeadingLevel,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    BorderStyle,
    VerticalAlign
} from "docx";


export async function generateDocx(content, outputPath) {

    try {
        const FONT = "Calibri";

        const TITLE_SIZE = 40;
        const HEADING_SIZE = 32;
        const BODY_SIZE = 24;
        const TABLE_SIZE = 22;

        const LINE_SPACING = 276;
        const PARAGRAPH_AFTER = 120;


        const children = [];



        children.push(

            new Paragraph({

                alignment: AlignmentType.CENTER,

                spacing: {
                    after: 400
                },

                children: [

                    new TextRun({

                        text: content.title,

                        allCaps: true,

                        bold: true,

                        font: FONT,

                        size: TITLE_SIZE

                    })

                ]

            })

        );



        for (const element of content.elements) {

            switch (element.type) {

                case "code_block": {

                    const codeRuns = [];

                    const lines = element.code.split("\n");

                    lines.forEach((line, index) => {

                        codeRuns.push(
                            new TextRun({
                                text: line,
                                font: "Consolas",
                                size: 20,
                                noProof: true,
                                break: index === lines.length - 1 ? 0 : 1
                            })
                        );

                    });

                    children.push(
                        new Paragraph({

                            spacing: {
                                before: 0,
                                after: 200,
                            },

                            children: codeRuns,

                        })
                    );

                    break;
                }

                case "heading":

                    children.push(

                        new Paragraph({

                            heading:

                                element.level === 1
                                    ? HeadingLevel.HEADING_1
                                    : element.level === 2
                                        ? HeadingLevel.HEADING_2
                                        : HeadingLevel.HEADING_3,

                            spacing: {

                                before: 300,

                                after: 160

                            },

                            children: [

                                new TextRun({

                                    text: element.text,

                                    bold: true,

                                    font: FONT,

                                    size: HEADING_SIZE,

                                    color: "404040"

                                })

                            ]

                        })

                    );

                    break;



                case "paragraph":

                    children.push(

                        new Paragraph({

                            alignment: AlignmentType.JUSTIFIED,

                            spacing: {

                                after: PARAGRAPH_AFTER,

                                line: LINE_SPACING

                            },

                            children:

                                element.runs.map(run =>

                                    new TextRun({

                                        text: run.text,

                                        bold: run.bold ?? false,

                                        italic: run.italic ?? false,

                                        underline: run.underline
                                            ? {}
                                            : undefined,

                                        color: run.color,

                                        font: FONT,

                                        size: BODY_SIZE

                                    })

                                )

                        })

                    );

                    break;



                case "bullet_list":

                    for (const item of element.items) {

                        children.push(

                            new Paragraph({

                                bullet: {

                                    level: 0

                                },

                                alignment: AlignmentType.JUSTIFIED,

                                spacing: {

                                    after: 60,

                                    line: LINE_SPACING

                                },

                                children: [

                                    new TextRun({

                                        text: item,

                                        font: FONT,

                                        size: BODY_SIZE

                                    })

                                ]

                            })

                        );

                    }

                    children.push(

                        new Paragraph({

                            spacing: {

                                after: 150

                            }

                        })

                    );

                    break;


                case "numbered_list":

                    element.items.forEach((item, index) => {

                        children.push(

                            new Paragraph({

                                alignment: AlignmentType.JUSTIFIED,

                                spacing: {

                                    after: 60,

                                    line: LINE_SPACING

                                },

                                children: [

                                    new TextRun({

                                        text: `${index + 1}. ${item}`,

                                        font: FONT,

                                        size: BODY_SIZE

                                    })

                                ]

                            })

                        );

                    });

                    children.push(

                        new Paragraph({

                            spacing: {

                                after: 150

                            }

                        })

                    );

                    break;



                case "table":

                    children.push(

                        new Table({

                            width: {

                                size: 100,

                                type: WidthType.PERCENTAGE

                            },

                            rows: [



                                new TableRow({

                                    children:

                                        element.headers.map(header =>

                                            new TableCell({

                                                verticalAlign: VerticalAlign.CENTER,

                                                borders: {

                                                    top: { style: BorderStyle.SINGLE, size: 1 },

                                                    bottom: { style: BorderStyle.SINGLE, size: 1 },

                                                    left: { style: BorderStyle.SINGLE, size: 1 },

                                                    right: { style: BorderStyle.SINGLE, size: 1 }

                                                },

                                                children: [

                                                    new Paragraph({

                                                        alignment: AlignmentType.CENTER,

                                                        children: [

                                                            new TextRun({

                                                                text: header,

                                                                bold: true,

                                                                font: FONT,

                                                                size: TABLE_SIZE

                                                            })

                                                        ]

                                                    })

                                                ]

                                            })

                                        )

                                }),


                                ...element.rows.map(row =>

                                    new TableRow({

                                        children:

                                            row.map(cell =>

                                                new TableCell({

                                                    verticalAlign: VerticalAlign.CENTER,

                                                    borders: {

                                                        top: { style: BorderStyle.SINGLE, size: 1 },

                                                        bottom: { style: BorderStyle.SINGLE, size: 1 },

                                                        left: { style: BorderStyle.SINGLE, size: 1 },

                                                        right: { style: BorderStyle.SINGLE, size: 1 }

                                                    },

                                                    children: [

                                                        new Paragraph({

                                                            alignment: AlignmentType.CENTER,

                                                            children: [

                                                                new TextRun({

                                                                    text: cell,

                                                                    font: FONT,

                                                                    size: TABLE_SIZE

                                                                })

                                                            ]

                                                        })

                                                    ]

                                                })

                                            )

                                    })

                                )

                            ]

                        })

                    );

                    children.push(

                        new Paragraph({

                            spacing: {

                                after: 250

                            }

                        })

                    );

                    break;

            }

        }


        const doc = new Document({

            sections: [

                {

                    children

                }

            ]

        });

        const buffer = await Packer.toBuffer(doc);

        await fs.writeFile(outputPath, buffer);

    } catch (err) {
        throw err;
    }

}

