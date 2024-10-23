import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategorieFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
}

export type TypeCategorieSkeleton = EntrySkeletonType<TypeCategorieFields, "categorie">;
export type TypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorieSkeleton, Modifiers, Locales>;

export function isTypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategorie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'categorie'
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

export interface TypeProjetFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    region?: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    catgorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    description?: EntryFieldTypes.RichText;
    details?: EntryFieldTypes.RichText;
    thumbnail?: EntryFieldTypes.AssetLink;
}

export type TypeProjetSkeleton = EntrySkeletonType<TypeProjetFields, "projet">;
export type TypeProjet<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjetSkeleton, Modifiers, Locales>;

export function isTypeProjet<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProjet<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'projet'
}
