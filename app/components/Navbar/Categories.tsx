'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from "../CategoryBox";
import Container from '../Container/Container';

export const categories = [
  {
    label: 'Aguascalientes',
    description: 'Aguascalientes México',
  },
  {
    label: 'Baja California',
    description: 'Baja California México',
  },
  {
    label: 'Baja California Sur',
    description: 'Baja California Sur México',
  },
  {
    label: 'Campeche',
    description: 'Campeche México',
  },
  {
    label: 'Chiapas',
    description: 'Chiapas México',
  },
  {
    label: 'Chihuahua',
    description: 'Chihuahua México',
  },
  {
    label: 'Coahuila',
    description: 'Coahuila México',
  },
  {
    label: 'Colima',
    description: 'Colima México',
  },
  {
    label: 'CDMX',
    description: 'CDMX México',
  },
  {
    label: 'Durango',
    description: 'Durango México',
  },
  {
    label: 'Guanajuato',
    description: 'Guanajuato México',
  },
  {
    label: 'Hidalgo',
    description: 'Hidalgo México',
  },
  {
    label: 'Jalisco',
    description: 'Jalisco México',
  },
  {
    label: 'México',
    description: 'México México',
  },
  {
    label: 'Michoacan',
    description: 'Michoacan México',
  },
  {
    label: 'Morelos',
    description: 'Morelos México',
  },
  {
    label: 'Nayarit',
    description: 'Nayarit México',
  },
  {
    label: 'Nuevo Leon',
    description: 'Nuevo Leon México',
  },
  {
    label: 'Oaxaca',
    description: 'Oaxaca México',
  },
  {
    label: 'Puebla',
    description: 'Puebla México',
  },
  {
    label: 'Queretaro',
    description: 'Queretaro México',
  },
  {
    label: 'Quintana Roo',
    description: 'Quintana Roo México',
  },
  {
    label: 'SLP',
    description: 'San Luis Potosi México',
  },
  {
    label: 'Sinaloa',
    description: 'Sinaloa México',
  },
  {
    label: 'Sonora',
    description: 'Sonora México',
  },
  {
    label: 'Tabasco',
    description: 'Tabasco México',
  },
  {
    label: 'Tamaulipas',
    description: 'Tamaulipas México',
  },
  {
    label: 'Tlaxcala',
    description: 'Tlaxcala México',
  },
  {
    label: 'Veracruz',
    description: 'Veracruz México',
  },
  {
    label: 'Yucatan',
    description: 'Yucatan México',
  },
  {
    label: 'Zacatecas',
    description: 'Zacatecas México',
  },
  
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
            pt-4
            flex 
            flex-row 
            items-center 
            justify-between
            overflow-x-auto
          "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;