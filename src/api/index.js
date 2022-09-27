import http from '@/util/http'

export var CategoryAPI = {
        get: function (fid) {
                return http({ url: '/category/list/' + fid })
        }
}

export var UserAPI = {
        login: function (data) {
                return http({ url: "/user/login_pwd", method: "post", data });
        },
        region: function (data) {
                return http({ url: "/user/register", method: "post", data });
        },
        useRepeat: (use) => http({ url: "/user/check_name/" + use }),
        phoneRepeat: (phone) => http({ url: "/user/check_phone/" + phone, })


}

export var AddressAPI = {
        get: function () {
                return http({ url: "/address/list" });
        },
        setDefault: function (id) {
                return http({ url: "/address/set_default/" + id });
        },
        remove: function (id) {
                return http({ url: "/address/remove/" + id });
        },
        add: (data) => http({ url: "/address/add", method: "post", data }),
        update: (data) => http({ url: "/address/update", method: "post", data }),
}

export const CartAPI = {
        getByIds: ids => http({ url: '/cart/list_ids', method: 'post', data: { ids } }),
        get: () => http({ url: "/cart/list", method: "post" }),
        remove: ids => http({ url: "/cart/remove", method: "post", data: { ids } }),
        increase: id => http({ url: "/cart/increase/" + id, method: "post" }),
        decrease: id => http({ url: "/cart/decrease/" + id, method: "post" }),
        addCart: (data) => http({ url: '/cart/add', method: 'post', data }),
        totalCart: () => http({ url: "/cart/total" })
};

export const ProductAPI = {
        get: (data) => http({ url: "/product/list", method: "post", data }, false),
        getModel: id => http({ url: "/product/model/" + id })
};

export const OrderAPI = {
        getList: (data) => http({ url: "/order/confirm", method: "post", data }),
        getPayList: () => http({ url: '/order/list_all' }),
        notPayList: () => http({ url: '/order/list_unpay' }),
        hasPayList: () => http({ url: '/order/list_pay' }),
        getAccount: (id) => http({ url: 'order/account/' + id }),
        removeOrder: (id) => http({ url: '/order/remove/' + id }),
        payOrder: (id) => http({ url: '/order/pay/' + id })
};

