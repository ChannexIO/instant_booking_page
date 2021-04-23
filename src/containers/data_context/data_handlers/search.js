import { useCallback, useMemo, useReducer } from "react";

import { actions, INITIAL_STATE, reducer } from "./reducers/search_data";

export default () => {
  const [searchData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const loadPropertiesList = useCallback(
    (params, filter) => {
      return actions.loadPropertiesList(dispatch, params, filter);
    },
    [dispatch],
  );

  const searchActions = useMemo(
    () => ({
      loadPropertiesList,
    }),
    [loadPropertiesList],
  );

  return useMemo(() => ({ searchData, searchActions }), [searchData, searchActions]);
};
