// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { filesMeta, tabs } from '.';
import deepmerge from '/Users/zhanbo/happy/x-render/node_modules/deepmerge';
export const patchRoutes = ({ routes }) => {
  Object.values(routes).forEach((route) => {
    if (filesMeta[route.id]) {
      route.meta = deepmerge(route.meta, filesMeta[route.id]);

      // apply real tab data from id
      route.meta.tabs = route.meta.tabs?.map(id => ({
        ...tabs[id],
        meta: filesMeta[id],
      }));
    }
  });
}
