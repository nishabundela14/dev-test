import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { JsonFile } from './json-file';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csvToJSON';
  public lines: JsonFile = {};
  public sizecharts: any[] = [];
  public adjustments: any[] = []
  constructor () {
  }

  onFileSelect(input: any) {
    const files = input.target.files;
    var fileTypes = ['csv'];  //acceptable file types

    if (files && files.length) {
      var extension = files[0].name.split('.').pop().toLowerCase(),
      isExist = fileTypes.indexOf(extension) > -1; 
      if(isExist){
        const fileToRead = files[0];
        const fileReader = new FileReader();
      //  fileReader.onload = this.onFileLoad;
        
      fileReader.onload = (e) => {
        this.lines.name = '';
        this.lines.id = 1;
        this.lines.gender = '';
        this.lines.brandSizeCharts = [];

        let csv:any = fileReader.result;
        let allTextLines = csv.split(/\r|\n|\r/);
        console.log(allTextLines);

        for (let i=2; i<allTextLines.length; i+=30) {
          this.sizecharts = []; 
          this.adjustments = [];
          if (allTextLines[i] !== '') {
            let size = allTextLines[4].split(',');
            for (let m = i+4 ; m <= i+14;m+=2) {
              let cols = allTextLines[m].split(',');
                let obj = {
                  [size[0]]: cols[0],
                  [size[1]]: cols[1],
                  [size[2]]: cols[2],
                  [size[3]]: cols[3],
                  [size[4]]: cols[4],
                  [size[5]]: cols[5],
                  [size[6]]: cols[6],
              }
              this.sizecharts.push(obj);
          }

        for (let j = i+16 ; j <= i+24;j+=4) {
          let cols = allTextLines[j].split(',');
          let rows = allTextLines[j+2].split(',');
          let obj = {
            [cols[0]]: [
              {
                [cols[1]] : rows[1],
                [cols[2]] : rows[2],
                [cols[3]] : rows[3],
                [cols[4]] : rows[4],
                [cols[5]] : rows[5],
              }
            ]
          }
            this.adjustments.push(obj)
        }

        let subArr = {
          region:'',
          subType:'',
          sizeCharts: this.sizecharts,
          adjustmentTable: this.adjustments
        }
        this.lines.brandSizeCharts.push(subArr);

        
      }//if
    }//main for
        console.log("", this.lines);
        if (this.lines) {
          const blob = new Blob([JSON.stringify(this.lines)], {type: 'data:text/json;charset=UTF-8'});
          saveAs(blob, 'brand-data.json')
        }
    }
        fileReader.readAsText(fileToRead, "UTF-8");
  }
}
}
}
