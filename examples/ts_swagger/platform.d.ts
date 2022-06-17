interface DisableLoadShedPolicyRequest {
    uid: string;
    updatedBy: string;
}

interface DisableLoadShedPolicyResponse {
    isError?: boolean;
    success?: {
        data?: {};
    };
    error?: any;
}
/* @ts-ignore */
@paths()
interface PlatformConfigService {
    disableLoadShedPolicy(input: DisableLoadShedPolicyRequest): Promise<DisableLoadShedPolicyResponse>;
}
