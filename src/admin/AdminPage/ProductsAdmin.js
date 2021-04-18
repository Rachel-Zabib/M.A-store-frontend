import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    EmailField,
    Edit,
    Create,
    SimpleForm,
    SelectInput,
    TextInput,
    ReferenceInput,
    DeleteWithConfirmButton,
    NumberField,
    NumberInput,
    ImageField,
    Filter,
} from 'react-admin';
import ActiveField from "./ActiveField";

// const ProductFilter = (props) => (
//     <Filter {...props}>
//         <TextInput label="Search" source="q" alwaysOn />
//         <ReferenceInput label="Brand" source="id" reference="Products" allowEmpty>
//             <SelectInput optionText="brandProduct" />
//         </ReferenceInput>
//     </Filter>
// );

export const ProductsList = props => (
    <List /*filters={<ProductFilter/>}*/ {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="headerProduct" />
            <TextField source="brandProduct" />
            {/* <TextField source="categoryProduct" /> */}
            <TextField source="priceProduct" />
            <TextField source="discountProduct" />
            <TextField source="stockProduct" />
            {/* <NumberField source="buyNum" /> */}
            {/* <TextField source="macatProduct" /> */}
            <ImageField source="imgSrc[0]"  title=""/>
            {/* <ImageField source="imgSrc[1]"  title=""/> */}
            {/* <ImageField source="imgSrc[3]"  title=""/> */}
            <EditButton/>
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);


export const ProductsEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="headerProduct" />
            <SelectInput source="brandProduct" choices={[
                { id: 'MAC', name: 'MAC' },
                { id: 'LORIAL PARIS', name: 'LORIAL PARIS' },
                { id: 'BOBBI BROWN', name: 'BOBBI BROWN' },
                { id: 'IL MAKIAGE', name: 'IL MAKIAGE' },
            ]} /> 
            <SelectInput source="categoryProduct" choices={[
                { id: 'Lips', name: 'Lips' },
                { id: 'Face', name: 'Face' },
                { id: 'Eyse', name: 'Eyse' },
            ]} /> 
            <TextInput source="macatProduct" />
            <TextInput source="imgSrc[0]" />
            <TextInput source="imgSrc[1]" />
            <TextInput source="imgSrc[2]" />
            <NumberInput source="buyNum" />
            <SelectInput source="stockProduct" choices={[
                { id: 'in stock', name: 'in stock' },
                { id: 'sold out', name: 'sold out' },
            ]} /> 
            <TextInput source="priceProduct" />
            <TextInput source="discountProduct" />
            <TextInput source="shortExplanation" />
            <TextInput source="explanationproduct" />
            <TextInput source="moreInfoProduct" />
            <TextInput source="similarProducts" />
        </SimpleForm>
    </Edit>
);

export const ProductsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="HeaderProduct*" source="headerProduct" />
            <SelectInput label="BrandProduct*" source="brandProduct" choices={[
                { id: 'MAC', name: 'MAC' },
                { id: 'LORIAL PARIS', name: 'LORIAL PARIS' },
                { id: 'BOBBI BROWN', name: 'BOBBI BROWN' },
                { id: 'IL MAKIAGE', name: 'IL MAKIAGE' },
            ]} /> 
           <SelectInput label="CategoryProduct*" source="categoryProduct" choices={[
                { id: 'Lips', name: 'Lips' },
                { id: 'Face', name: 'Face' },
                { id: 'Eyse', name: 'Eyse' },
            ]} /> 
            <TextInput source="macatProduct" />
            <TextInput source="imgSrc[0]" />
            <TextInput source="imgSrc[1]" />
            <TextInput source="imgSrc[2]" />
            <NumberInput source="buyNum" />
            <SelectInput label="StockProduct*" source="stockProduct" choices={[
                { id: 'in stock', name: 'in stock' },
                { id: 'sold out', name: 'sold out' },
            ]} /> 
            <TextInput label="PriceProduct*" source="priceProduct" />
            <TextInput source="discountProduct" />
            <TextInput source="shortExplanation" />
            <TextInput source="explanationproduct" />
            <TextInput source="moreInfoProduct" />
            <TextInput source="similarProducts" />
        </SimpleForm>
    </Create>
);