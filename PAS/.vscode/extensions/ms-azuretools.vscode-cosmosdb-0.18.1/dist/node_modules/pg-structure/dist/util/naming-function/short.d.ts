import O2MRelation from "../../pg-structure/relation/o2m-relation";
import M2ORelation from "../../pg-structure/relation/m2o-relation";
import M2MRelation from "../../pg-structure/relation/m2m-relation";
/**
 * M2M name generator function.
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
declare function m2mName(relation: M2MRelation): string;
/**
 * O2M name generator function. (REF = SOURCE)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
declare function o2mName(relation: O2MRelation): string;
/**
 * M2O name generator function. (REF = TARGET)
 *
 * @ignore
 * @param relation is the relation to generate name for.
 */
declare function m2oName(relation: M2ORelation): string;
declare const _default: {
    o2m: typeof o2mName;
    m2o: typeof m2oName;
    m2m: typeof m2mName;
};
/**
 * Relation name generator function.
 *
 * @ignore

 */
export default _default;
//# sourceMappingURL=short.d.ts.map