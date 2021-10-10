import { FC } from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
  description: string;
}

const HelmetLayout: FC<Props> = ({ title, children, description }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </>
);

export default HelmetLayout;
