import { Helmet } from "react-helmet-async";
import FAQ from "../components/home/FAQ";

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>FAQ | Mayleki Jewellery</title>
        <meta name="description" content="Frequently asked questions about Mayleki Jewellery — rental process, returns, shipping and more." />
      </Helmet>
      <div className="page-wrapper">
        <FAQ />
      </div>
    </>
  );
}
