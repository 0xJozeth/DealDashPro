import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MoreProperties from "@/components/Property Details/MoreProperties";
import NearbyProperties from "@/components/Property Details/NearbyProperties";
import PropertyImages from "@/components/Property Details/PropertyImages";
import PropertyMain from "@/components/Property Details/PropertyMain";
import PropertyTitle from "@/components/Property Details/PropertyTitle";
import { db } from "@/db";
import Image from "next/image";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await db.property.findFirst({
    where: {
      id: params.id,
    },
  });

  console.log("params", params);
  console.log("property", property);

  return (
    <>
      <MaxWidthWrapper>
        <PropertyTitle data={property} />
        <PropertyImages data={property} />
        <PropertyMain data={property} />
        <MoreProperties data={property} />
        <NearbyProperties data={property} />
      </MaxWidthWrapper>
    </>
  );
};

export default PropertyDetailsPage;
