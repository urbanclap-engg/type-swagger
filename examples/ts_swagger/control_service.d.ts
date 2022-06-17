
interface AddProfilePhotoInput {
    entityId?: string;
    entityType?: string;
    faceProfileUrl?: string;
}

interface AddProfilePhotoOutput {
    success?: string;
    message?: string;
}

interface AddUserDeviceRequest {
    userId: string;
    userType: string;
    deviceType?: string;
    deviceId?: string;
    deviceGuid?: string;
    advertisingId?: string;
}

interface AddUserDeviceResponse {
    success?: boolean;
    message?: string;
}

interface AllRulesResponse {
    data?: {
        rule_id?: string;
        rule_name?: string;
        enabled?: boolean;
        created_by?: string;
    }[];
}

interface BlockUserInput {
    userId: string;
    userType: string;
    blockedBy: string;
    blockedReason: string;
}

interface BlockUserOutput {
    success?: boolean;
    message?: string;
}

interface CheckPointInput {
    id?: string;
    data?: {};
}

interface CheckPointOutput {
    result: BlockUserInput;
    data?: {};
}

/**
 * create input Schema
 */
interface CreateRuleInput {
    rule_id: string;
    rule_name: string;
    parsed_expression: {}[][];
    entity: string;
    rule_actions: {
        actions: {
            action_name: string;
            params: {};
            required_fields: string[];
        }[];
        level: number;
        followup_period: number;
        observation_period: number;
    }[];
    rule_application: {
        id: string;
    };
    created_by: string;
    enabled: boolean;
}

interface DeleteFaceProfileInput {
    entityId?: string;
    entityType?: string;
    faceProfileUrl?: string;
}

interface DetectDuplicateProfileRequest {
    providerId: string;
    primaryCategory: string;
}

type DetectDuplicateProfileResponse = DuplicateProfileObject;

interface DetectFaceFromPhotoInput {
    selfieImageUrl?: string;
    entityId?: string;
    entityType?: string;
    refType?: string;
    refId?: string;
}

interface DetectFaceFromPhotoOutput {
    status?: string;
    faceId?: string;
    faceAttrs?: {};
}

interface DetectFaceRequest {
    providerId: string;
    selfieImageUrl: string;
}

interface DetectFaceResponse {
    isFaceDetected?: boolean;
}

interface DetectObjectsInImageInput {
    image_type?: string;
    image_url?: string;
    ref_id?: string;
    ref_type?: string;
    app_version?: string;
}

interface DetectObjectsInImageOutput {
    error?: boolean;
    image_type?: string;
    detected_objects?: {
        object_type?: string;
        detected?: boolean;
    }[];
    processed_readings?: {
        key_1?: string;
        value_1?: string;
    };
}

interface DuplicateProfileObject {
    providerId?: string;
    isDuplicateProfile?: boolean;
    duplicateMatches?: {
        providerId?: string;
        reason?: string;
    }[];
}

interface EmptyRequest {
}

interface ExecuteRuleInput {
    rule_id?: string;
}

interface FetchRuleInput {
    rule_id?: string;
}

interface GetAllImageDataByRefRequest {
    refId?: string;
    refType?: string;
}

type GetAllImageDataByRefResponse = {
    _id?: string;
    ref_type?: string;
    ref_id?: string;
    image_type?: string;
    meta_data?: {};
    objects?: string[];
    result?: {};
    image_url?: string;
    processed_readings?: {};
    created_at?: string;
    updated_at?: string;
}[];

interface GetBulkDuplicateProfilesRequest {
    providers: string[];
}

interface GetBulkDuplicateProfilesResponse {
    duplicateProfilesData?: DuplicateProfileObject[];
}

interface GetBulkRulesByIdRequest {
    rule_ids?: string[];
}

interface GetBulkRulesByIdResponse {
    data?: {
        enabled?: boolean;
        _id?: string;
        version?: number;
        rule_id?: string;
        application_point?: {};
        rule_name?: string;
        rule_actions?: {}[];
        rule_query?: {}[][];
        entity?: string;
        created_by?: string;
        conditions?: {
            definition?: {}[][];
        };
        updated_at?: string;
        created_at?: string;
    }[];
}

interface GetCheckPointDataInput {
    entityType: string;
    entityId: string;
    customerRequestId: string;
    checkPointId: string;
}

interface GetCheckPointDataOutput {
    success?: boolean;
    data?: {
        rule_id?: string;
        customer_request_id?: string;
        provider_id?: string;
        customer_id?: string;
        variables?: {};
        params?: {};
        result?: string;
        created_at?: string; // date-time
        updated_at?: string; // date-time
    }[];
}

interface GetFaceProfileInput {
    entityId?: string;
    entityType?: string;
}

interface GetFaceProfileOutput {
    person_group_id?: string;
    person_id?: string;
    status?: string;
    meta_data?: {};
    photos?: {};
    entity_type?: string;
    entity_id?: string;
}

interface GetImageDataByRefRequest {
    imageType?: string;
    imageUrl?: string;
    refId?: string;
    refType?: string;
}

interface GetImageDataByRefResponse {
    detectionResult?: {};
    processedReadings?: {};
}

interface GetRoverActioningDetailsForProviderRequest {
    providerId?: string;
}

interface GetRoverActioningDetailsForProviderResponse {
    providerMetrics?: {};
    providerId?: string;
    actionedRules?: {
        ruleId?: string;
        level?: number;
        actionedDate?: string;
        ruleQuery?: {}[];
    }[];
}

interface GetRoverTemporaryBlockDetailsRequest {
    providerId?: string;
}

interface GetRoverTemporaryBlockDetailsResponse {
    providerId?: string;
    blockedTill?: string;
    ruleId?: string;
    blockDuration?: number;
    ruleDetails?: {
        ruleQuery?: {}[];
    };
}

interface GetSelfieResultDataInput {
    entityId?: string;
    entityType?: string;
    refId?: string;
    refType?: string;
}

interface GetSelfieResultDataOutput {
    success?: boolean;
    data?: {
        ref_type?: string;
        ref_id?: string;
        url?: string;
        meta_data?: {};
        status?: string;
        entity_type?: string;
        entity_id?: string;
        face_id?: string;
    }[];
}

interface IdentifyFaceProfileInput {
    entityType?: string;
    entityId?: string;
    faceId?: string;
}

interface IdentifyFaceProfileOutput {
    candidates?: {
        entityType?: string;
        entityId?: string;
        confidence?: number;
    }[];
}

interface ProviderInsightsMetricsResponse {
    data?: any[];
}

interface ProviderInsightsPLResponse {
    data?: any[];
}

interface ProviderInsightsRequest {
    providerId?: string;
}

interface SuccessResponse {
}

interface UnBlockUserInput {
    userId: string;
    userType: string;
    unBlockedBy: string;
    unBlockedReason: string;
}

interface UnBlockUserOutput {
    success?: boolean;
    message?: string;
}

interface UpdateRuleStateInput {
    rule_id?: string;
    enabled?: boolean;
}

interface VerifyFaceRequest {
    entityType: string;
    entityId: string;
    refType?: string;
    refId?: string;
    imageUrl: string;
}

interface VerifyFaceResponse {
    detectResult?: {
        status?: string;
        faceId?: string;
    };
    verifyResult?: {
        success?: boolean;
        score?: number;
    };
}

/* @ts-ignore */
@paths()
@SwaggerVersion("2.0")
@BasePath("/control-service")
@Info({
        "description": "control to improve",
        "version": "0",
        "title": "ControlService"
})
interface ControlService {
    addProfilePhoto(input: AddProfilePhotoInput): Promise<AddProfilePhotoOutput>;

    addUserDevice(input: AddUserDeviceRequest): Promise<AddUserDeviceResponse>;

    blockUser(input: BlockUserInput): Promise<BlockUserOutput>;

    checkPoint(input: CheckPointInput): Promise<CheckPointOutput>;

    createRule(input: CreateRuleInput): Promise<SuccessResponse>;

    deleteFaceProfile(input: DeleteFaceProfileInput): Promise<SuccessResponse>;

    detectFaceFromPhoto(input: DetectFaceFromPhotoInput): Promise<DetectFaceFromPhotoOutput>;

    detectObjectsInImage(input: DetectObjectsInImageInput): Promise<DetectObjectsInImageOutput>;

    executeRule(input: ExecuteRuleInput): Promise<SuccessResponse>;

    fetchRule(input: FetchRuleInput): Promise<SuccessResponse>;

    getActionConfig(input: SuccessResponse): Promise<SuccessResponse>;

    getAllImageDataByRef(input: GetAllImageDataByRefRequest): Promise<GetAllImageDataByRefResponse>;

    getAllRules(input: EmptyRequest): Promise<AllRulesResponse>;

    getBulkRulesById(input: GetBulkRulesByIdRequest): Promise<GetBulkRulesByIdResponse>;

    getCheckPointData(input: GetCheckPointDataInput): Promise<GetCheckPointDataOutput>;

    getFaceProfile(input: GetFaceProfileInput): Promise<GetFaceProfileOutput>;

    getImageDataByRef(input: GetImageDataByRefRequest): Promise<GetImageDataByRefResponse>;

    getRoverActioningDetailsForProvider(input: GetRoverActioningDetailsForProviderRequest): Promise<GetRoverActioningDetailsForProviderResponse>;

    getRoverTemporaryBlockDetails(input: GetRoverTemporaryBlockDetailsRequest): Promise<GetRoverTemporaryBlockDetailsResponse>;

    getSelfieResultData(input: GetSelfieResultDataInput): Promise<GetSelfieResultDataOutput>;

    getVariableConfig(input: SuccessResponse): Promise<SuccessResponse>;

    identifyFaceProfile(input: IdentifyFaceProfileInput): Promise<IdentifyFaceProfileOutput>;

    unBlockUser(input: UnBlockUserInput): Promise<UnBlockUserOutput>;

    updateRuleState(input: UpdateRuleStateInput): Promise<SuccessResponse>;

    verifyFace(input: VerifyFaceRequest): Promise<VerifyFaceResponse>;

    fraudDetectionService: {
        detectDuplicateProfile(input: DetectDuplicateProfileRequest): Promise<DetectDuplicateProfileResponse>;
        detectFace(input: DetectFaceRequest): Promise<DetectFaceResponse>;
        getBulkDuplicateProfiles(input: GetBulkDuplicateProfilesRequest): Promise<GetBulkDuplicateProfilesResponse>;
    }

    providerInsights: {
        metrics(input: ProviderInsightsRequest): Promise<ProviderInsightsMetricsResponse>;
        presentation(input: ProviderInsightsRequest): Promise<ProviderInsightsPLResponse>;
    }

}
