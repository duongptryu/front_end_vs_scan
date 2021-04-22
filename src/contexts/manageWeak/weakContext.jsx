import React from 'react';
// here we can initialise with any value we want.


const getRandomuserParams = (params) => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
});


const fetch = (params = {}) => {
    setLoading(true);
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      type: "json",
      data: getRandomuserParams(params),
    }).then((data) => {
      console.log(data);
      setLoading(false);
      setData(data.results);
      setPagination({
        ...params.pagination,
        total: 200,
      });
    });
  };

const UserContext = React.createContext({}); 
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;