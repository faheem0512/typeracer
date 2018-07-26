import {FETCH_DATA} from "../action/types";
import networkFetch from "../network";
export default function (store) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case FETCH_DATA: {
                    next({
                        ...action,
                        payload: {...action.payload, showLoading:true}
                    });
                    return networkFetch({
                        ...action.payload

                    }).then(_ => {
                        let data = _.data;
                        return next({
                            ...action,
                            payload: {...action.payload, data,showLoading:false}
                        });

                    }).catch(e => {
                        return next({
                            ...action,
                            payload: {...action.payload, error:e,showLoading:false}
                        });
                    });
                }

                default :
                    return next(action)
            }
        }
    }
};



