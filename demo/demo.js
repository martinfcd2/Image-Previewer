
import React from 'react';
import ReactDom from 'react-dom';
import ImagePreviewer from '../src/index'

const config = {
  mode: 'multiple',
  width: 700,
  height: 500,
  loadingText: 'loading... please wait.',
  errorText: 'preview failed, please retry later or contact your administrator.',
  watermarkText: 'watermark',
  allowWheelScale: true,
  fileList: [
    {
      src: 'https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6L2RGVGZNdDAxMTRpY3c1S05zV21LRExkMDBMMVlOT25laWF4RTNpY0ppY0ZzMFdDYlU0dVZKdnhrWWNBUTdoYXlTVzQxaklJR1VqdTdlVW16emdpYmlidWlhazZZZy82NDA?x-oss-process=image/format,png',
    },
    {
      src: 'https://image-static.segmentfault.com/257/618/2576186159-5b0ca85a31dfc_articlex',
    },
    {
      src: 'https://image-static.segmentfault.com/255/541/2555411433-5b0ca85a46a1e_articlex',
    },
    {
      src: 'http://www.bkill.com/u/upload/2017/06/13/140108493451.jpg',
    },
  ],
}

ReactDom.render(<ImagePreviewer {...config} />, document.getElementById('root'));
