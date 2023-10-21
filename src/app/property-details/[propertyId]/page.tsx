import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PropertyImages from '@/components/Property Details/PropertyImages';
import PropertyMain from '@/components/Property Details/PropertyMain';
import PropertyTitle from '@/components/Property Details/PropertyTitle';
import Image from 'next/image';

const PropertyDetailsPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<PropertyTitle />
				<PropertyImages />
				<PropertyMain />
			</MaxWidthWrapper>
		</>
	);
};

export default PropertyDetailsPage;
