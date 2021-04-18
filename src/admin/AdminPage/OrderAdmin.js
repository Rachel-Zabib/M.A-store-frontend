import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    SelectInput,
    TextInput,
    DeleteWithConfirmButton,
    NumberField,
    ReferenceField,
    ShowButton,
    ArrayField,
    SimpleShowLayout,
    Show,
    ImageField,
    BooleanInput,
} from 'react-admin';


export const OrderList = props => (
    <List {...props} >
        <Datagrid >
            <TextField source="id" />
            <TextField source="date" />
            <TextField source="name" />
            <TextField source="address" />
            <TextField source="status" />
            <NumberField source="totalItems" />
            <TextField source="totalOrder" />
            <EditButton/>
            <ShowButton/>
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export const OrderEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <SelectInput source="status" choices={[
                { id: 'received', name: 'received' },
                { id: 'in process', name: 'in process' },
                { id: 'approved', name: 'approved' },
                { id: 'sent', name: 'sent' },
                { id: 'delivered', name: 'delivered' },
                { id: 'cancelled', name: 'cancelled' },
            ]} />
           <BooleanInput label="refunded" source="refunded"  />
            
        </SimpleForm>
    </Edit>
);


export const OrderShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="date" />
            <TextField source="address" />
            <TextField source="name" />
            <TextField source="userId" />
            <ArrayField  label="Items" source="itemsInOrder">
                <Datagrid>
                    <TextField source="headerProduct" />
                    <NumberField source="amountProduct" />
                    <TextField source="brandProduct" />
                    <TextField source="priceProduct" />
                    <ImageField source="imgProduct"  title=""/>
                </Datagrid>
            </ArrayField>
            <TextField source="comments" />
            <TextField source="status" />
            <NumberField source="totalItems" />
            <TextField source="totalOrder" /> 
        </SimpleShowLayout>
    </Show>
);

