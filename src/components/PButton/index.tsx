import React, { memo, useMemo } from "react";
import type { SyntheticEvent } from "react";
import "./index.scss";

interface PButtonProps {
  disabled?: boolean;
  className?: string;
  type?: string;
  text?: any;
  size?: string;
  icon?: any;
  onClick: () => void;
  loading?: boolean;

  prefix?: any;
  suffix?: any;
  textWithSuffix?: boolean;
  stopPropagation?: boolean;
}
// how to use: <PPButton text="Connect" type="text"  className="disable"/>
const PButton: React.FC<PButtonProps> = memo(
  ({
    prefix,
    suffix,
    text,
    onClick,
    className,
    type = "primary",
    icon,
    size = "m",
    disabled = false,
    loading = false,
    textWithSuffix = true,
    stopPropagation = true,
  }) => {
    const formatClassName = useMemo(() => {
      let defaultCN = "pButton";
      // if (className) {
      //   defaultCN += ' ' + className;
      // }
      // if (type === 'primary') {
      //   defaultCN += ' primary';
      //   if (size === 'm') {
      //     defaultCN += ' m';
      //   } else if (size === 's') {
      //     defaultCN += ' s';
      //   }
      // } else if (type === 'secondary') {
      //   defaultCN += ' secondary';
      //   if (size === 'm') {
      //     defaultCN += ' m';
      //   } else if (size === 's') {
      //     defaultCN += ' s';
      //   }
      // } else if (type === 'text') {
      //   defaultCN += ' text';
      // } else if (type === 'icon') {
      //   defaultCN += ' icon';
      // }
      if (type) {
        defaultCN += ` ${type}`;
      }
      if (size) {
        defaultCN += ` ${size}`;
      }
      if (disabled) {
        defaultCN += ` disabled`;
      }
      if (className) {
        defaultCN += ` ${className}`;
      }
      // defaultCN += ` ${type} ${size} ${disabled && 'disabled'} ${className}`;
      return defaultCN;
    }, [className, type, size, disabled]);
    const handleClick = (e: SyntheticEvent) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (disabled) {
      } else {
        onClick && onClick();
      }
    };
    return (
      <button className={formatClassName} onClick={handleClick}>
        {prefix}
        {type === "icon" ? (
          icon
        ) : loading ? (
          <>
            {text ? (
              <>
                <span className="btnText">{text}</span>
                <div className="spinnerWrapper">
                  <div className="loading-spinner"></div>
                </div>
              </>
            ) : (
              <div className="spinnerWrapper">
                <div className="loading-spinner"></div>
              </div>
            )}
          </>
        ) : (
          <>
            <span className="btnText">{text}</span>
            {type === "text" &&
              (suffix ??
                (textWithSuffix && <i className="iconfont icon-iconLink"></i>))}
          </>
        )}
        {type !== "text" && !loading && suffix}
      </button>
    );
  }
);

export default PButton;
