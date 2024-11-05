import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    thumbnail?: EntryFieldTypes.AssetLink;
    corps?: EntryFieldTypes.RichText;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export function isTypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArticle<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'article'
}

export interface TypeCategorieFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
}

export type TypeCategorieSkeleton = EntrySkeletonType<TypeCategorieFields, "categorie">;
export type TypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorieSkeleton, Modifiers, Locales>;

export function isTypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategorie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'categorie'
}

export interface TypeGallerieFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeGallerieSkeleton = EntrySkeletonType<TypeGallerieFields, "gallerie">;
export type TypeGallerie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGallerieSkeleton, Modifiers, Locales>;

export function isTypeGallerie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGallerie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'gallerie'
}

export interface TypeListFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Colonnes" | "Slider">;
    corps?: EntryFieldTypes.RichText;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeProjetSkeleton | TypeTextSkeleton>>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    id: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypeNavigationLinkFields {
    label: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
}

export type TypeNavigationLinkSkeleton = EntrySkeletonType<TypeNavigationLinkFields, "navigationLink">;
export type TypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationLinkSkeleton, Modifiers, Locales>;

export function isTypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigationLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigationLink'
}

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeGallerieSkeleton | TypeListSkeleton | TypeProjetSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeProjetFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    region?: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    catgorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    description?: EntryFieldTypes.RichText;
    details?: EntryFieldTypes.RichText;
    thumbnail?: EntryFieldTypes.AssetLink;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeGallerieSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
}

export type TypeProjetSkeleton = EntrySkeletonType<TypeProjetFields, "projet">;
export type TypeProjet<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjetSkeleton, Modifiers, Locales>;

export function isTypeProjet<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProjet<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'projet'
}

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
