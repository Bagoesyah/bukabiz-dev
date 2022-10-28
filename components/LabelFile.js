import ICFileDoc from '@assets/FileDoc.svg'
import ICFilePdf from '@assets/FilePdf.svg'
import ICFilePpt from '@assets/FilePpt.svg'
import ICFileXls from '@assets/FileXls.svg'
import ICLockKey from '@assets/LockKey.svg'

function LabelFile(props) {
  const iconTitle = ({ name, isFormat, isPricing }) => {
    return (
      <>
        <div className=" flex items-end">
          {(isFormat === 'doc' || isFormat === 'docx') && <ICFileDoc />}
          {isFormat === 'pdf' && <ICFilePdf />}
          {isFormat === 'ppt' && <ICFilePpt />}
          {(isFormat === 'xls' || isFormat === 'xlsx') && <ICFileXls />}
          {isPricing == 2 && <ICLockKey />}
        </div>
        <p className=" text-sm text-center">{`${name.length < 35 ? name : name.slice(0, 35) + '..'}`}</p>
      </>
    )
  }

  return (
    props.isDownload ? (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.isFile}
        className=" flex flex-col justify-center items-center cursor-pointer"
      >
        {iconTitle({ ...props })}
      </a>
    ) : (
      <button
        onClick={props.onClick}
        className=" flex flex-col justify-center items-center cursor-pointer"
      >
        {iconTitle({ ...props })}
      </button>
    )
  )
}
export default LabelFile