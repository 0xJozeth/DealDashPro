'use client';

import { Ref, useEffect, useRef, useState } from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import MoreProperties from '@/components/Property Details/MoreProperties';
import NearbyProperties from '@/components/Property Details/NearbyProperties';
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
				<MoreProperties />
				<NearbyProperties />
			</MaxWidthWrapper>
		</>
	);
};

export default PropertyDetailsPage;
