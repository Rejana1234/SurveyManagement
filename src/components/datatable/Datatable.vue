<template>

    <table>
        <thead>
            <tr>
                <th scope="col" v-for="column in columns" :key="column.name" @click="column.name === 'action'? '' : $emit('sort', column.name)"
                    :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                    :style="'width:'+column.width+';'+'cursor:pointer;'+'text-align:center'">
                    {{column.label}}
                </th>
            </tr>
        </thead>
        <slot></slot>
    </table>

</template>

<script>
export default {
  name: "InterPortDatatable",
  props: ["columns", "sortKey", "sortOrders"],
};
</script>

<style scoped></style>
