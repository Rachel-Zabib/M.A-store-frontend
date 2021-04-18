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
    BulkDeleteButton,
    Filter,
    PasswordInput 
} from 'react-admin';
import ActiveField from "./ActiveField";

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="id" reference="users" allowEmpty>
            <SelectInput optionText="firstName" />
        </ReferenceInput>
    </Filter>
);


export const UserList = props => (
    <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="role" />
            <ActiveField source="active" />
            <EditButton/>
        </Datagrid>
    </List>
);
export const UserEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
        <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="city" />
            <TextInput source="street" />
            <TextInput source="building" />
            <TextInput source="apartment" />
            <TextInput source="post" />
            <SelectInput source="role" choices={[
                { id: 'user', name: 'user' },
                { id: 'admin', name: 'admin' },
            ]} /> 
            <SelectInput source="active" choices={[
                { id: 'false', name: 'false' },
                { id: 'true', name: 'true' },
            ]} /> 
        </SimpleForm>
    </Edit>
);
export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <PasswordInput source="password" />
            <TextInput source="phone" />
            <TextInput source="city" />
            <TextInput source="street" />
            <TextInput source="building" />
            <TextInput source="apartment" />
            <TextInput source="post" />
            <SelectInput source="role" choices={[
                { id: 'user', name: 'user' },
                { id: 'admin', name: 'admin' },
            ]} /> 
            <SelectInput source="active" choices={[
                { id: 'false', name: 'false' },
                { id: 'true', name: 'true' },
            ]} /> 
        </SimpleForm>
    </Create>
);




export const UserListReactAdmin = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="role" />
            <ActiveField source="active" />
            <EditButton/>
            {/* <BulkDeleteButton/> */}
            {/* <DeleteWithConfirmButton basePath="/users" /> */}

        </Datagrid>
    </List>
);

export const UserEditReactAdmin = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <SelectInput source="role" choices={[
                { id: 'user', name: 'user' },
                { id: 'admin', name: 'admin' },
            ]} /> 
            <SelectInput source="active" choices={[
                { id: 'false', name: 'false' },
                { id: 'true', name: 'true' },
            ]} /> 
        </SimpleForm>
    </Edit>
);

export const UserCreateReactAdmin = props => (
    <Create {...props}>
        <SimpleForm>
           
            <TextInput source="name" />
            <TextInput source="email" />
            <SelectInput source="role" choices={[
                { id: 'user', name: 'user' },
                { id: 'admin', name: 'admin' },
            ]} /> 
            <SelectInput source="active" choices={[
                { id: 'false', name: 'false' },
                { id: 'true', name: 'true' },
            ]} /> 
        </SimpleForm>
    </Create>
);