import { utils, writeFileXLSX } from 'xlsx'


export const exportXlsx = (excelData:any[], filename:string) => {
   /* generate worksheet from state */
   const ws = utils.json_to_sheet(excelData);
   /* create workbook and append worksheet */
   const wb = utils.book_new();
   utils.book_append_sheet(wb, ws, "Data");
   /* export to XLSX */
   writeFileXLSX(wb, `${filename}.xlsx`);
}

