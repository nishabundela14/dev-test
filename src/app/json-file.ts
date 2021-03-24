export interface JsonFile {
        name?: string,
        gender?:string,
        brandSizeCharts?:brandSize[],
        id?:number
}


interface brandSize{
        region?: string,
        subType?: string,
        sizeCharts?: any[],
        adjustmentTable?: any[]
}
