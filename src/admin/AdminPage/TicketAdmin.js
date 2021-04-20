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
    EmailField,
    DateField,
    ShowButton,
    Show,
    SimpleShowLayout,
} from 'react-admin';


export const TicketList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="status" />
            <TextField label="Client name" source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <DateField source="createdAt" />  
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const TicketEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="comments" />
            <SelectInput source="status" choices={[
                { id: 'PENDING', name: 'PENDING' },
                { id: 'ACCEPTED', name: 'ACCEPTED' },
                { id: 'REJECTED', name: 'REJECTED' }
            ]} />
        </SimpleForm>
    </Edit>
);

export const TicketShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField label="Client name" source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="message" />
            <TextField source="status" />
            <TextField source="comments" />
            <DateField label="Create time" source="createdAt" />
            <DateField label="Update time" source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);