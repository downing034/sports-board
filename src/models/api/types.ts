// To parse this data:
//
//   import { Convert } from "./file";
//
//   const cfbTeams = Convert.toCfbTeams(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CfbTeams {
    id:             number;
    school:         string;
    mascot:         string;
    abbreviation:   string;
    alt_name1:      null | string;
    alt_name2:      string;
    alt_name3:      string;
    conference:     string;
    classification: string;
    color:          string;
    alt_color:      string;
    logos:          string[];
    twitter:        string;
    location:       Location;
}

export interface Location {
    venue_id:         number;
    name:             string;
    city:             string;
    state:            string;
    zip:              string;
    country_code:     string;
    timezone:         string;
    latitude:         number;
    longitude:        number;
    elevation:        string;
    capacity:         number;
    year_constructed: number;
    grass:            boolean;
    dome:             boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCfbTeams(json: string): CfbTeams[] {
        return cast(JSON.parse(json), a(r("CfbTeams")));
    }

    public static cfbTeamsToJson(value: CfbTeams[]): string {
        return JSON.stringify(uncast(value, a(r("CfbTeams"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = val[key];
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "CfbTeams": o([
        { json: "id", js: "id", typ: 0 },
        { json: "school", js: "school", typ: "" },
        { json: "mascot", js: "mascot", typ: "" },
        { json: "abbreviation", js: "abbreviation", typ: "" },
        { json: "alt_name1", js: "alt_name1", typ: u(null, "") },
        { json: "alt_name2", js: "alt_name2", typ: "" },
        { json: "alt_name3", js: "alt_name3", typ: "" },
        { json: "conference", js: "conference", typ: "" },
        { json: "classification", js: "classification", typ: "" },
        { json: "color", js: "color", typ: "" },
        { json: "alt_color", js: "alt_color", typ: "" },
        { json: "logos", js: "logos", typ: a("") },
        { json: "twitter", js: "twitter", typ: "" },
        { json: "location", js: "location", typ: r("Location") },
    ], false),
    "Location": o([
        { json: "venue_id", js: "venue_id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "state", js: "state", typ: "" },
        { json: "zip", js: "zip", typ: "" },
        { json: "country_code", js: "country_code", typ: "" },
        { json: "timezone", js: "timezone", typ: "" },
        { json: "latitude", js: "latitude", typ: 3.14 },
        { json: "longitude", js: "longitude", typ: 3.14 },
        { json: "elevation", js: "elevation", typ: "" },
        { json: "capacity", js: "capacity", typ: 0 },
        { json: "year_constructed", js: "year_constructed", typ: 0 },
        { json: "grass", js: "grass", typ: true },
        { json: "dome", js: "dome", typ: true },
    ], false),
};
