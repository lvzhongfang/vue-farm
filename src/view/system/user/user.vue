<style scoped></style>
<template>
	<div>
		<Card>
			<Button type="info" class="search-btn"  @click="showModal">新建用户</Button>
			<Table :columns="columns" :data="tableData"></Table>
		</Card>
		<Modal  v-model="modalMap.modalVisible"  :title="modalMap.modalTitle" :loading=true :footer-hide=true>
			<form-group :list="formList"  @on-submit-success="handleSubmit"></form-group>
      </Modal>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import Tables from '_c/tables'
	import FormGroup from '_c/form-group'
	import { getUserList } from '@/api/data'
	import { setToken, getToken } from '@/libs/util'
	import { formatDate } from '@/view/common/dateFormat.js';
	export default {
		name: 'User',
		components: {},
		data() {
			return {
				// 弹出框
				modalMap: {
					modalVisible: false,
					modalTitle: '创建用户'
				},
				// 渲染form数据
				formList: [
					{
					name: 'userNo',
					type: 'i-input',
					value: '',
					label: '账号',
					rule: [
						{ required: true, message: '账号不能为空', trigger: 'blur' }
					]
					},
					{
					name: 'userName',
					type: 'i-input',
					value: '',
					label: '用户名',
					rule: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' }
					]
					},
					{
					name: 'phoneNo',
					type: 'i-input',
					value: '',
					label: '手机号码',
					rule: [
						{ required: true, message: '手机号不能为空', trigger: 'blur' },
						{
						type: 'string',
						min: 11,
						max: 11,
						message: '必须为手机号码',
						trigger: 'blur'
						}
					]
					},
					{
					name: 'email',
					type: 'i-input',
					value: '',
					label: '邮箱',
					rule: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{
						type: 'email',
						message: '必须为邮箱格式',
						trigger: 'blur'
						}
					]
					}
				],
				columns: [
					{ title: 'Name', key: 'userName', sortable: true },
					{ title: 'Email', key: 'email', editable: true },
					{ title: 'Create-Time', 
					  key: 'createTime',
					  render: (h,params)=>{
                            return h('div',
                                formatDate(new Date(params.row.createTime),'yyyy-MM-dd hh:mm')
                            )
                    	}
					},
					{
					title: 'Handle',
					key: 'handle',
					options: ['delete'],
					button: [
						(h, params, vm) => {
						return h('Poptip', {
							props: {
							confirm: true,
							title: '你确定要删除吗?'
							},
							on: {
							'on-ok': () => {
								vm.$emit('on-delete', params)
								vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
							}
							}
						}, [
							h('Button', '自定义删除')
						])
						}
					]
					}
				],
				tableData: []
				}
		},
		methods: {
			handleDelete (params) {
			console.log(params)
			},
			exportExcel () {
				this.$refs.tables.exportCsv({
					filename: `table-${(new Date()).valueOf()}.csv`
				})
			},
			// 弹出对话框
			showModal () {
				this.modalMap.modalVisible = true
			},
			handleSubmit (value) {
			setTimeout(() => {
				newuser(value.data).then(res=> {
					const data = res.data
					if (res.data.code === 0) {
					this.$Message.info(`${data.msg}`)
					// 重新获取数据
					this.getUserList(this.pageNum, this.pageSize)
					} else {
					this.$Message.error(`${data.msg}`)
					}
				}).catch(err => {
					this.$Message.error(err)
				})
				this.modalMap.modalVisible = false
			}, 1000)
			}
		},
		beforeMount() {
			//挂载之前
		},
		mounted() {
			//挂载完毕
			getUserList('').then(res => {
				console.log(res.data.data.data)
				this.tableData = res.data.data.data
			})
		},
		beforeCreate() {
			//创建之前
		},
		created() {
			//创建完毕
		},
		beforeDestroy() {
			//销毁之前
		},
		destroyed() {
			//销毁
		}
	}
</script>
