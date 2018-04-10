<template>
  <el-tabs type="border-card" style="max-width: 1300px;margin: 0 10%;height:calc(100% - 10px)">
    <el-tab-pane label="文件上传" class="upload-page">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-upload :limit="1" class="upload-demo" :action="url" :http-request="uploadFunc" :on-remove="handleRemove" :before-remove="beforeRemove">
            <el-button type="primary" v-loading.fullscreen.lock="loading">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="12" style="text-align:end;display:flex;flex-direction: column;align-items:center">
          <el-button type="primary" :disabled="uploadLink" @click="uploadToChain" :loading="smallLoading">{{ upChainText }}</el-button>
          <el-tag type="info" style="margin-top:10px" v-show="!!address">上链地址：{{ address}}</el-tag>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top:20px">
        <el-table :data="tableData" style="margin: 0 auto;" stripe border>
          <el-table-column header-align="center" prop="path" label="路径"></el-table-column>
          <el-table-column header-align="center" prop="hashcode" label="HashCode"></el-table-column>
        </el-table>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="文件下载">
      <el-row type="flex" justify="center">
        <el-col :span="12" style="display:flex">
          <el-input placeholder="请输入文件名称" prefix-icon="el-icon-search" v-model="inputName">
          </el-input>
          <el-button style="margin-left:20px" icon="el-icon-search" type="primary" @click="handleSearch" :loading="searchLoading">{{ searchText }}</el-button>
          <el-button style="margin-left:20px" icon="el-icon-download" type="primary" v-show="showDownload" @click="handleDownload">下载</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top:20px">
        <el-table :data="downloadTableData" style="margin: 0 auto;" stripe border>
          <el-table-column header-align="center" prop="path" label="路径"></el-table-column>
          <el-table-column header-align="center" prop="hashcode" label="HashCode"></el-table-column>
        </el-table>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// @ is an alias to /src
import { stringify } from 'qs'

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      smallLoading: false,
      searchLoading: false,
      address: '',
      inputName: '',
      fileList: [],
      file: '',
      url: process.env.VUE_APP_SERVER_URL,
      tableData: [],
      downloadTableData: []
    }
  },
  computed: {
    uploadLink () {
      return this.file === '' && this.tableData.length === 0
    },
    upChainText () {
      return this.smallLoading ? '上链中...' : '信息上链'
    },
    showDownload () {
      return this.inputName !== '' && this.downloadTableData.length !== 0
    },
    searchText () {
      return this.searchLoading ? '搜索中...' : '搜索'
    }
  },
  methods: {
    uploadFunc (item) {
      let formdata = new FormData()
      formdata.append('file', item.file)
      formdata.append('action', 'test')
      this.loading = true
      this.$http({
        method: 'post',
        url: 'upload/uploadfile',
        data: formdata
      }
      ).then(res => {
        this.loading = false
        if (res.data) {
          this.file = item.file.name
          this.tableData = res.data.rows
        }
      }).catch(err => {
        this.loading = false
        this.$message.error('上传失败！')
        console.log(err)
      })
    },
    uploadToChain () {
      this.smallLoading = true
      this.address = ''
      this.$http({
        method: 'post',
        url: '/upload/uploadToChain',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: stringify({
          filename: this.file,
          fragmentHashList: JSON.stringify(this.tableData)
        })
      }
      ).then(res => {
        this.smallLoading = false
        console.log(res)
        if (res.data && res.data.result) {
          this.address = res.data.address
        }
      }).catch(err => {
        this.smallLoading = false
        this.$message.error(err.message)
        console.log(err)
      })
    },
    handleRemove (file, fileList) {
      this.file = ''
      this.tableData = []
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSearch () {
      if (this.inputName === '') {
        this.$message.error('请输入文件名！')
        return false
      }
      this.searchLoading = true
      this.$http({
        method: 'post',
        url: '/download/checkfile',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: stringify({
          filename: this.inputName
        })
      }
      ).then(res => {
        this.searchLoading = false
        console.log(res)
        if (res.data.result && res.data.fragmentHashList) {
          this.downloadTableData = res.data.fragmentHashList
        } else {
          this.$message.error('无查找结果')
        }
      }).catch(err => {
        this.searchLoading = false
        this.$message.error(err.message)
        console.log(err)
      })
    },
    handleDownload () {
      this.downloadPost({
        url: this.url + '/download/downloadfile',
        data: {
          filename: this.inputName
        }
      })
    },
    downloadPost (config) {
      const url = config.url
      const data = config.data
      const form = document.createElement('form')
      form.action = url
      form.method = 'post'
      form.style.display = 'none'
      Object.keys(data).forEach(key => {
        const input = document.createElement('input')
        input.name = key
        input.value = data[key]
        form.appendChild(input)
      })
      const button = document.createElement('input')
      button.type = 'submit'
      form.appendChild(button)
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    }
  }
}
</script>
