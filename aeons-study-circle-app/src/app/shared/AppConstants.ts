import { environment } from '../../environments/environment';
export class AppConstants {
    public static SERVER_BASE_URL = "https://shopping-server-007.herokuapp.com";
    public static _MOCK_API = "/assets/data/mockVendorData.json";
    public static VENDORS_ENDPOINT = AppConstants.SERVER_BASE_URL + "/vendors";
    public static UPLOAD_ENDPOINT = AppConstants.SERVER_BASE_URL + "/upload";
    public static VENDOR_UNIQE_KEY_PREFIX = "VDR_";
    public static PLANS_ARRAY = [{
        id: 1,
        name: "Basic"
    },
    {
        id: 2,
        name: "Silver"
    },
    {
        id: 3,
        name: "Gold"
    }
    ];
    public static VENDOR_STATUS_ARRAY = [{
        id: 1,
        name: "Active"
    },
    {
        id:2,
        name:"Inactive"
    }
    ];
}