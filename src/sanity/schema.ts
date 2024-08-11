import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./schemaTypes/blockContentType";
import { categoryType } from "./schemaTypes/categoryType";
import { postType } from "./schemaTypes/postType";
import { authorType } from "./schemaTypes/authorType";
import { projectType } from "./schemaTypes/projectType";
import { certificateType } from "./schemaTypes/certificateType";
import { workType } from "./schemaTypes/workType";
import { educationType } from "./schemaTypes/educationType";
import { personalType } from "./schemaTypes/personelType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    projectType,
    certificateType,
    workType,
    educationType,
    personalType,
  ],
};
