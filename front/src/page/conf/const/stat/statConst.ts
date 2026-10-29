export const STAT_TYPE = {
    TODAY : "T",
    MONTH : "M",
    DATE : "D",
}

export const STAT_EVENT_TYPE_LIST = [
    {
        cd : 'FFT',
        nm : '소방 119',
    },
    {
        cd : 'POL',
        nm : '경찰 112',
    },
    {
        cd : 'POL001M', // 경찰 001 영상(movie)
        nm : '순찰차출동영상',
    },
    {
        cd : 'SWE',
        nm : '안전귀가서비스'
    },
    {
        cd : 'NDM',
        nm : '재난상황'
    },
    {
        cd: 'ANM',
        nm : '법무부'
    }
]

export const BODT_STYLE = {
    font: {
        bold: false,
        sz: '10'
    },
    alignment: {
        horizontal: "center",
        vertical: "center",
    }
}

export const TITLE_STYLE = {
    font: {
        bold: true,
        sz: '17'
    },
    alignment: {
        horizontal: "center",
        vertical: "center",
    }
}

export const HEADER_STYLE = {
    font: {
        bold: true,
        sz: '13'
    },
    alignment: {
        horizontal: "center",
        vertical: "center",
    },
    border: {
        top: {style: "thin", color: {rgb: "000000"}},
        bottom: {style: "thin", color: {rgb: "000000"}},
        left: {style: "thin", color: {rgb: "000000"}},
        right: {style: "thin", color: {rgb: "000000"}}
    }
}