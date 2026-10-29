export interface UserType {
    token : string,
    userId : string,
    userName : string,
    loginId : string,
    mobile : string,
    email : string,
    userGd : string,
    userType : string,
    userZnCd : string
}

export interface SysType{
    sysName : string,
    url : string
}

export interface CodeType {
    codeCd: string,
    codeNm: string
}

export interface TreeRootType{
    value : string,
    label : string,
    className : string,
    showCheckBox : boolean,
    children : TreeChildType[]

}

export interface TreeChildType {
    value: string,
    label: string,
    className: string
}

export interface WeatherInfoType {
    tempCd : string,
    tempNm : string,
    rainCd : string,
    rainNm : string,
    skyCd : string,
    skyNm : string,
    humiCd : string,
    humiNm : string,
    skyRainCd : string,
    skyRainNm : string,
    windCd : string,
    windNm : string,
    windSpeedCd : string,
    windSpeedNm : string,
}