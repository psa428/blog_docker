import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUserSession } from "../selectors";
import { server } from "../bff";
// import { fetchPosts } from "../bff/operations/fetch-posts";

export const useServerRequest = () => {
    const session = useSelector(selectUserSession);    

    return useCallback((operation, ...params) => {
      
        const request = ['register', 'autorize', 'fetchPost', 'fetchPosts'].includes(operation)
        ? params
        : [session, ...params];     

        return server[operation](...request);
    }, [session]);
};    