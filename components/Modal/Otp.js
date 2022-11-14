import React, {
  memo,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import ButtonClose from "../ButtonClose";
import ICLogo from "@assets/Logo.svg";
import axios from "axios";

function Otp(props) {
  const [numOtp, setNumOtp] = useState(0);

  const formOtp = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", props.email);
    bodyFormData.append("otp", numOtp);

    // console.log({
    //   body: bodyFormData,
    //   email: props.email,
    //   otp: numOtp
    // })
    axios({
      method: "post",
      url: process.env.urlAPI + "v1/check-otp",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (res) {
        if (res.data.success === true) {
          console.log(res.data.success);
          props.setFormNewPass(true);
        }
      })
      .catch(function (res) {
        console.log("err", res);
        if (res.request.status == 403) {
          alert(res.response.data.message);
        }
        props.setFormNewPass(false);
        // if (res.response.status === 500) {
        //   console.log('bad request')
        //   alert(res.response.data.message)
        //   props.setFormNewPass(false)
        // }
      });
    // props.checkOtp(false)
  };

  return (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative mx-4 md:mx-0 md:w-[45rem]"
      >
        <ButtonClose onClick={props.onClick} />
        <div className=" p-8 py-12 md:p-12 md:px-24 flex flex-col items-center">
          <ICLogo />
          <div className=" mt-12 text-2xl">Atur ulang kata sandi</div>
          <div className=" text-gray-400 text-sm font-light text-center mt-2">
            Masukkan kode verifikasi yang kami kirimkan ke email
            <br />
            {props.email}
          </div>
          <div className=" flex flex-col mt-4">
            <label className=" text-sm ml-2">Masukan 6 digit kode</label>
            <div className=" flex space-x-3 mt-1">
              <OTPInput
                autoFocus
                isNumberInput
                length={6}
                onChangeOTP={(otp) => setNumOtp(otp)}
              />
            </div>
            <div className=" flex space-x-4 mt-5">
              <button
                onClick={formOtp}
                disabled={numOtp.length === 6 ? false : true}
                type="btn"
                className={`${
                  numOtp.length === 6 ? "bg-black" : "bg-slate-100"
                } 
                text-center py-2 w-full text-white text-sm font-bold rounded`}
              >
                Lanjut
              </button>
            </div>
          </div>
          <div className=" mt-32 md:mt-20 text-sm font-light text-gray-400">
            Butuh bantuan? Kunjungi bagian{" "}
            <span className=" text-black">Bantuan Kami</span> atau{" "}
            <span className=" text-black">Hubungi Kami</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const OTPInputComponent = (props) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    // inputClassName,
    // inputStyle,
    onClick,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(length).fill(""));

  const handleOtpChange = useCallback(
    (otp) => {
      const otpValue = otp.join("");
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
  );

  const getRightValue = useCallback(
    (str) => {
      let changedValue = str;

      if (!isNumberInput || !changedValue) {
        return changedValue;
      }

      return Number(changedValue) >= 0 ? changedValue : "";
    },
    [isNumberInput]
  );

  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  const handleOnChange = useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const handleOnKeyDown = useCallback(
    (e) => {
      const pressedKey = e.key;

      switch (pressedKey) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - activeInput)
        .split("");
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
        if (length == 6) {
          handleOtpChange(updatedOTPValues);
        }
      }
    },
    [activeInput, handleOtpChange, getRightValue, length, otpValues]
  );

  return (
    <div className="flex gap-3" {...rest}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <SingleOTPInput
            key={`SingleInput-${index}`}
            type={isNumberInput ? "number" : "text"}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            // style={inputStyle}
            className="w-1/6 text-center p-2 text-sm border rounded focus:outline-primary appearance-none hover:appearance-none focus:appearance-none"
            disabled={disabled}
          />
        ))}
    </div>
  );
};

const SingleOTPInputComponent = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
};

const SingleOTPInput = memo(SingleOTPInputComponent);

const OTPInput = memo(OTPInputComponent);
// export default OTPInput;

export default Otp;
