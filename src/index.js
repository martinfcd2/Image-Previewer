import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import {
  RotateRightOutlined,
  RotateLeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  DownloadOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ImageBox from './ImageBox';
import 'antd/dist/antd.css'

const fileTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const fileList = [
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
];
const extra = '无法预览或者预览失败';
const allowDownload = true;

class PreviewerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      src: props.fileList[0].src,
      index: 0,
      rotate: 0,
      scale: 1,
      reset: false,
      prevDisable: true,
      nextDisable: false,
    }
  }
  onPrev = () => {
    const { index } = this.state;
    const { fileList } = this.props;
    this.setState({
      src: fileList[index - 1].src,
      index: index === 0 ? 0 : index - 1,
      prevDisable: index - 1 === 0,
      nextDisable: index + 1 === fileList.length - 1,
    })
  }
  onNext = () => {
    const { index } = this.state;
    const { fileList } = this.props;
    this.setState({
      src: fileList[index + 1].src,
      index: index === fileList.length ? index : index + 1,
      prevDisable: index - 1 === 0,
      nextDisable: index + 1 === fileList.length - 1,
    })
  }
  onRotateLeft = () => {

  }
  onRotateRight = () => {

  }
  onZoomIn = () => {

  }
  onZoomOut = () => {

  }
  onFullscreenExit = () => {

  }
  onFullscreen = () => {

  }
  onReset = () => {

  }
  onDownload = () => {

  }
  onClose = () => {

  }
  renderFooter = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button style={{ margin: 5 }} onClick={this.onPrev} disabled={this.state.prevDisable}>
          <LeftOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onNext} disabled={this.state.nextDisable}>
          <RightOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onRotateLeft}>
          <RotateLeftOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onRotateRight}>
          <RotateRightOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onZoomIn}>
          <ZoomInOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onZoomOut}>
          <ZoomOutOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onFullscreenExit}>
          <FullscreenExitOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onFullscreen}>
          <FullscreenOutlined />
        </Button>
        <Button style={{ margin: 5 }} onClick={this.onReset}>
          reset
        </Button>
        {allowDownload && (
          <Button style={{ margin: 5 }} onClick={this.onDownload}>
            <DownloadOutlined />
          </Button>
        )}
        <Button style={{ margin: 5 }} onClick={this.onClose}>
          <CloseOutlined />
        </Button>
      </div>
    )
  }
  render() {
    const { src } = this.state;
    return (
      <div>
        <Modal
          title='Image Previewer'
          visible={this.state.modalVisible}
          width={748}
          maskClosable={false}
          footer={this.renderFooter()}
        >
          <ImageBox fileTypes={this.props.fileTypes} src={src} extra={this.props.extra} />
        </Modal>
        <Button onClick={() => this.setState({ modalVisible: true })}>Open PreViewer</Button>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <PreviewerModal fileTypes={fileTypes} fileList={fileList} extra={extra} allowDownload={allowDownload} />
  </React.StrictMode>,
  document.getElementById('root')
);
