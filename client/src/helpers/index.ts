export const updateQueryParams = (param: string, value: boolean) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(param, value ? '1' : '0');
    history.replace({ search: queryParams.toString() });
};
