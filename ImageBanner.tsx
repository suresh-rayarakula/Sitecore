'use client';
import { useState, useEffect } from 'react';
import {
  Text,
  Field,
  LinkField,
  Link as JssLink,
  RichText as JssRichText,
  Image as JssImage,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import useWindowSize from '@rooks/use-window-size';
type ImageBannerProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
    imageDesktop: ImageField;
    imageTab: ImageField;
    imageMobile: ImageField;
    primaryLink: LinkField;
    secondaryLink: LinkField;
    selectTitleTag: {
      fields: {
        tag: Field<string>;
      };
    };
  };
};

export const ImageBannerDefaultComponent = (): JSX.Element => (
  <div className="image-banner d-flex align-items-center">
    <div className="image-banner_content-wrap">
      <div className="row container">
        <span>No Datasource Present</span>
      </div>
    </div>
  </div>
);

export const Default = ({ fields }: ImageBannerProps): JSX.Element => {
  const { innerWidth } = useWindowSize();
  const BreakPoint = 767;
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = fields?.selectTitleTag?.fields?.tag?.value;

  // Using the `useEffect` hook to update the loading state
  useEffect(() => {
    // Once the component has mounted, set `isLoading` to false
    setIsLoading(false);
  }, []);
  if (fields) {
    return (
      <>
        {isLoading ? (
          <div className="loader-icon">
            <img src="./Loader-Icon.gif" alt="" title="" />
          </div>
        ) : (
          <div className="image-banner d-flex align-items-center">
            {(innerWidth as number) > BreakPoint ? (
              <JssImage field={fields?.imageDesktop} className="img-fluid w-100" />
            ) : (
              <JssImage field={fields?.imageMobile} className="img-fluid w-100" />
            )}

            <div className="image-banner_content-wrap">
              <div className="row container">
                <div className="col-sm-12 image-banner_content">
                  <div className="image_banner_heading">
                    <Text tag={TitleTag} field={fields?.title} />
                  </div>
                  <div className="row">
                    <JssRichText field={fields?.description} className="description col-md-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="two-columns-buttons">
              <div className="container">
                <JssLink className="btn btn_primary icon_arrow-right" field={fields.primaryLink} />
                <JssLink className="btn btn_secondary" field={fields.secondaryLink} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <ImageBannerDefaultComponent />;
};

export const ImageBannerWithoutCTA = ({ fields }: ImageBannerProps): JSX.Element => {
  const { innerWidth } = useWindowSize();
  const BreakPoint = 767;
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = fields?.selectTitleTag?.fields?.tag?.value;

  // Using the `useEffect` hook to update the loading state
  useEffect(() => {
    // Once the component has mounted, set `isLoading` to false
    setIsLoading(false);
  }, []);
  if (fields) {
    return (
      <>
        {isLoading ? (
          <p>&nbsp;</p>
        ) : (
          <div className="image-banner d-flex align-items-center">
            {(innerWidth as number) > BreakPoint ? (
              <JssImage field={fields?.imageDesktop} className="img-fluid w-100" />
            ) : (
              <JssImage field={fields?.imageMobile} className="img-fluid w-100" />
            )}

            <div className="image-banner_content-wrap">
              <div className="row container">
                <div className="col-sm-12 image-banner_content">
                  <div className="image_banner_heading">
                    <Text tag={TitleTag} field={fields?.title} />
                  </div>
                  <div className="row">
                    <JssRichText field={fields?.description} className="description col-md-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <ImageBannerDefaultComponent />;
};
