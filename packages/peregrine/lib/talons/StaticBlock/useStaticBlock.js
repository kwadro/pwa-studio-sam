import {useEffect} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';


export const useStaticBlock= props => {
    const { query,identifiers} = props;

    const [runQuery, queryResponse] = useLazyQuery(query);
    const { loading, error, data } = queryResponse;
    // Run the query immediately and every time id changes.
    useEffect(() => {
        runQuery({ variables: { identifiers } });
    }, [identifiers, runQuery]);
    useEffect(() => {
        if (error) {
            console.error('GraphQL Error:', error);
        }
    }, [error]);

    return {
        html: data && data.cmsBlocks && data.cmsBlocks.items[0].content,
        loading:loading
    };
};
