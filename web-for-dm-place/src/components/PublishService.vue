<template>
	<div class="publish-service-componment">
    <div class="publish-service-title">
			<ul>
				<li @click='goBack'>返回</li>
			</ul>
    </div>
    <div class="publish-service-select">
			<span>服务类型：</span>
			<el-select v-model="serviceType" :disabled='disabled'
				size='small' placeholder="请选择" @change='tabDataSource'>
				<el-option v-for='(li, index) in servicetype'
					:key='index' :value='li.value' :label="li.name"></el-option>
			</el-select>
			<span v-show='serviceType !== "街景"'>数据源：</span>
			<el-select v-show='serviceType !== "街景"' v-model="dataSourceType" :disabled='disabled' size='small' placeholder="请选择" @change="setCheckDataPath">
				<el-option v-for='(li, index) in dataSource' :key='index'
					:value='li.value' :label="li.name"></el-option>
			</el-select>
    </div>
    <div class="publish-service-main">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择数据"></el-step>
        <el-step title="设置参数"></el-step>
        <el-step title="发布完成"></el-step>
      </el-steps>
      <div class="publish-service-main-content">
        <!--选择数据-->
        <div v-show='stepModule[0]'>
          <el-button type="primary" size="mini" @click='showServerDirectory'>选择数据</el-button>					
          <span class='longdatapath-overline' v-show='dataSourceType === "GV HBase" || dataSourceType === "GV HBase(History)"' :title='checkedDataRealPath'>
            {{ this.checkedDataRealPath }}
          </span>
          <span class='longdatapath-overline' v-show='checkedDataRealPath && !(dataSourceType === "GV HBase" || dataSourceType === "GV HBase(History)")' :title='checkedDataRealPath'>
            <span :title='serverPath'>根目录</span>
            {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
          </span>
          <ServerDirectoryDialog ref='serverDirectoryDialog' :breadcrumb='breadcrumb' :checkFolder='isCheckFolder' :currentDataSourceType='dataSourceType'
           :rootUrl='rootUrl' :importExportType="importExportType" @makeSure='checkedDataConfrim'></ServerDirectoryDialog>
          <el-dialog title="选择数据" :visible.sync="dmDialogVisible" width="50%">
            <DataMnagerDirectory></DataMnagerDirectory>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dmDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dmDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
				</div>
        <!--设置参数-->
				<div v-show='stepModule[1]' class="publishService-Params">
          <!-- MBtiles、IECAS GRST、ArcGIS Tile Package Huarui设置参数 -->
					<el-form v-if='ruleForm[0]' :model="ruleFormImgSql" ref="ruleFormImgSql"
						v-loading='publishLoad' :rules="rulesFormImgSql" label-width="100px" size="small">
						<el-form-item label="图层名称" prop="layerName" class="publish-data-layer-name">
							<el-input v-model="ruleFormImgSql.layerName" ></el-input>
						</el-form-item>
						<el-form-item label="数据路径" prop="path" class="path-overline" :title='checkedDataRealPath'>
							<span :title='serverPath'>根目录</span>
              {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
						</el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormImgSql.mimeType" disabled>
                <!-- <el-radio :label="ruleFormImgSql.mimeType" ></el-radio> -->
                <el-radio label="PNG"></el-radio>
                <el-radio label="JPEG"></el-radio>
                <el-radio label="TIFF"></el-radio>
              </el-radio-group>
						</el-form-item>
						<el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormImgSql.gridSet" disabled>
                <el-radio label="EPSG:4326"></el-radio>
                <el-radio label="EPSG:3857"></el-radio>
              </el-radio-group>
						</el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormImgSql.minLevel" disabled></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormImgSql.maxLevel" disabled></el-input>
              <span v-if='ruleFormImgSql.gridSet === "EPSG:4326"'> &nbsp;有效的层级范围：0-21</span>
              <span v-else > &nbsp;有效的层级范围：0-30</span>
            </el-form-item>
            <p class="publish-layerGroups-result" v-if='ruleFormImgSql.layerName && ruleFormImgSql.mimeType && ruleFormImgSql.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormImgSql.layerName && ruleFormImgSql.mimeType && ruleFormImgSql.gridSet'>
                {{ ruleFormImgSql.layerName  + '-' + ruleFormImgSql.mimeType + '-' + ruleFormImgSql.gridSet.slice(ruleFormImgSql.gridSet.indexOf(':') + 1, ruleFormImgSql.gridSet.length) }}
              </p>
            </div>
          </el-form>					
          <!-- HBase设置参数 -->
          <el-form v-if='ruleForm[2]' :model="ruleFormHBase"
            ref="ruleFormHBase" :rules="rulesHBase" v-loading='publishLoad' label-width="100px">
            <el-form-item label="图层名称" prop="layerName" class="publish-data-layer-name">
              <el-input v-model="ruleFormHBase.layerName"></el-input>
            </el-form-item>
             <el-form-item label="HBase数据源" prop="dataSource" class="publish-data-layer-name">
              <span>{{ activeHBase }}</span>
            </el-form-item>
             <el-form-item label="数据名称" prop="dataName" class="publish-data-layer-name">
              <span>{{ currentHBaseData }}</span>
            </el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormHBase.mimeType" disabled>
                <el-radio label="PNG"></el-radio>
                <el-radio label="JPEG"></el-radio>
              </el-radio-group>
						</el-form-item>
            <el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormHBase.gridSet" disabled>
                <el-radio label="EPSG:4326"></el-radio>
                <el-radio label="EPSG:3857"></el-radio>
              </el-radio-group>
						</el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormHBase.minLevel" disabled></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormHBase.maxLevel" disabled></el-input>
              <span v-if='ruleFormHBase.gridSet === "EPSG:4326"'> &nbsp;有效的层级范围：0-21</span>
              <span v-else > &nbsp;有效的层级范围：0-30</span>
            </el-form-item>
            <p class="publish-layerGroups-result" v-if='ruleFormHBase.layerName && ruleFormHBase.mimeType && ruleFormHBase.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormHBase.layerName && ruleFormHBase.mimeType && ruleFormHBase.gridSet'>
                {{ ruleFormHBase.layerName  + '-' + ruleFormHBase.mimeType + '-' + ruleFormHBase.gridSet.slice(ruleFormHBase.gridSet.indexOf(':') + 1, ruleFormHBase.gridSet.length) }}
              </p>
            </div>
          </el-form>
          <!-- GV RocksDB设置参数 -->
          <el-form v-if='ruleForm[6]' :model="ruleFormRocksDb"
            ref="ruleFormRocksDb" :rules="rulesRocksDb" v-loading='publishLoad' label-width="100px">
            <el-form-item label="图层名称" prop="layerName" class="publish-data-layer-name">
              <el-input v-model="ruleFormRocksDb.layerName"></el-input>
            </el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormRocksDb.mimeType" disabled>
                <!-- <el-radio :label="ruleFormRocksDb.mimeType" ></el-radio> -->
                <el-radio label="PNG"></el-radio>
                <el-radio label="JPEG"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormRocksDb.gridSet" disabled>
                <el-radio label="EPSG:4326"></el-radio>
                <el-radio label="EPSG:3857"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormRocksDb.minLevel" disabled></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormRocksDb.maxLevel" disabled></el-input>
              <span v-if='ruleFormRocksDb.gridSet === "EPSG:4326"'> &nbsp;有效的层级范围：0-21</span>
              <span v-else > &nbsp;有效的层级范围：0-30</span>
            </el-form-item>
            <p class="publish-layerGroups-result" v-if='ruleFormRocksDb.layerName && ruleFormRocksDb.mimeType && ruleFormRocksDb.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormRocksDb.layerName && ruleFormRocksDb.mimeType && ruleFormRocksDb.gridSet'>
                {{ ruleFormRocksDb.layerName  + '-' + ruleFormRocksDb.mimeType + '-' + ruleFormRocksDb.gridSet.slice(ruleFormRocksDb.gridSet.indexOf(':') + 1, ruleFormRocksDb.gridSet.length) }}
              </p>
            </div>
          </el-form>
          <!-- Tif、TIF 目录设置参数 -->
          <el-form v-if='ruleForm[3]' :model="ruleFormTif"
						ref="ruleFormTif" :rules="rulesFormTif" v-loading='publishLoad' label-width="100px">
						<el-form-item label="图层名称" prop="layerName" class="publish-data-layer-name">
							<el-input v-model="ruleFormTif.layerName"></el-input>
						</el-form-item>
            <el-form-item label="数据路径" prop="path" class="path-overline" :title='checkedDataRealPath'>
              <span :title='serverPath'>根目录</span>
              {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
            </el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormTif.mimeType" >
                <el-radio label="PNG" value="PNG"></el-radio>
                <el-radio label="JPEG" value="JPEG"></el-radio>
              </el-radio-group>
            </el-form-item> 
            <el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormTif.gridSet" @change='changeLevel'>
               <el-radio label="EPSG:4326"></el-radio>
               <el-radio label="EPSG:3857"></el-radio>
               <el-radio label="EPSG:4490"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormTif.minLevel"></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormTif.maxLevel"></el-input>
              <span v-if='ruleFormTif.gridSet === "EPSG:3857"'> &nbsp;有效的层级范围：0-30</span>
              <span v-else > &nbsp;有效的层级范围：0-21</span>
            </el-form-item>
            <el-form-item label="透明色" prop="transparentColor" class="publish-data-color">
              <el-color-picker v-model="ruleFormTif.transparentColor"></el-color-picker>
            </el-form-item>
						<p class="publish-layerGroups-result" v-if='ruleFormTif.layerName && ruleFormTif.mimeType && ruleFormTif.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormTif.layerName && ruleFormTif.mimeType && ruleFormTif.gridSet'>
                {{ ruleFormTif.layerName  + '-' + ruleFormTif.mimeType + '-' + ruleFormTif.gridSet.slice(ruleFormTif.gridSet.indexOf(':') + 1, ruleFormTif.gridSet.length) }}
              </p>
            </div>
					</el-form>
          <!-- Terrain设置参数 -->
          <el-form v-if='ruleForm[4]' :model="ruleFormTerrain"
            ref="ruleFormTerrain" :rules="rulesTerrain" v-loading='publishLoad' label-width="100px">
            <el-form-item label="图层名称" prop="layerName" class="publish-data-layer-name">
              <el-input v-model="ruleFormTerrain.layerName"></el-input>
            </el-form-item>
            <el-form-item label="数据路径" prop="configFile" class="path-overline" :title='checkedDataRealPath'>
              <span :title='serverPath'>根目录</span>
              {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
            </el-form-item>
            <el-form-item label="瓦片格式" prop="mimeType">
              <el-radio-group v-model="ruleFormTerrain.mimeType" disabled>
                <el-radio :label="ruleFormTerrain.mimeType" ></el-radio>
              </el-radio-group>
						</el-form-item>
            <el-form-item label="格网集" prop="gridSet">
              <el-radio-group v-model="ruleFormTerrain.gridSet" disabled>
                <!-- <el-radio :label="ruleFormTerrain.gridSet" ></el-radio> -->
                <el-radio label="EPSG:4326"></el-radio>
                <el-radio label="EPSG:3857"></el-radio>
              </el-radio-group>
						</el-form-item>
            <el-form-item label="层级范围" prop="minLevel" class="publish-data-level">
              <el-input v-model.number="ruleFormTerrain.minLevel" disabled></el-input>&nbsp; 至 &nbsp;<el-input v-model.number="ruleFormTerrain.maxLevel" disabled></el-input>
              <span v-if='ruleFormTerrain.gridSet === "EPSG:4326"'> &nbsp;有效的层级范围：0-21</span>
              <span v-else > &nbsp;有效的层级范围：0-30</span>
            </el-form-item>
            <p class="publish-layerGroups-result" v-if='ruleFormTerrain.layerName && ruleFormTerrain.mimeType && ruleFormTerrain.gridSet'>将生成1个图层：</p>
            <p class="publish-layerGroups-result" v-else>将生成0个图层：</p>
            <div class="publish-layerGroups-result">
              <p v-if='ruleFormTerrain.layerName && ruleFormTerrain.mimeType && ruleFormTerrain.gridSet'>
                {{ ruleFormTerrain.layerName  + '-' + ruleFormTerrain.mimeType + '-' + ruleFormTerrain.gridSet.slice(ruleFormTerrain.gridSet.indexOf(':') + 1, ruleFormTerrain.gridSet.length) }}
              </p>
            </div>
          </el-form>
          <!--倾斜摄影-->
          <el-form v-if='ruleForm[5]' :model="ruleFormTilePhoto"
            ref="ruleFormTilePhoto" :rules="rulesTilePhoto" v-loading='publishLoad' label-width="110px">
            <el-form-item label="图层名称" prop="name" class="publish-data-layer-name">
              <el-input v-model="ruleFormTilePhoto.name"></el-input>
            </el-form-item>
            <el-form-item label="数据路径" prop="dir" class="path-overline" :title='checkedDataRealPath'>
              <span :title='serverPath'>根目录</span>
              {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
            </el-form-item>
            <el-form-item label="数据类型" prop="format">
              <el-radio-group v-model="ruleFormTilePhoto.format" disabled>
                <el-radio :label="ruleFormTilePhoto.format"></el-radio>
                <!-- <el-radio label="B3DM"></el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show='ruleFormTilePhoto.format === "OSGB"' label="中心点经度" prop="longitude">
              <el-input v-model="ruleFormTilePhoto.longitude"></el-input>
            </el-form-item>
            <el-form-item v-show='ruleFormTilePhoto.format === "OSGB"' label="中心点纬度" prop="latitude">
              <el-input v-model="ruleFormTilePhoto.latitude"></el-input>
            </el-form-item>
            <el-form-item v-show='ruleFormTilePhoto.format === "OSGB"' label="中心点高度" prop="altitude">
              <el-input v-model="ruleFormTilePhoto.altitude" ></el-input>
            </el-form-item>
          </el-form>
          <!-- 街景设置参数 -->
          <el-form v-if='ruleForm[7]' :model="ruleFormStreet"
            ref="ruleFormStreet" :rules="rulesStreet" v-loading='publishLoad' label-width="100px">
            <el-form-item label="图层名称" prop="svName" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.svName"></el-input>
            </el-form-item>
            <el-form-item label="数据路径" prop="dir" class="publish-data-layer-name" :title='checkedDataRealPath'>
              <span :title='serverPath'>根目录</span>
              {{ this.checkedDataRealPath.slice(serverPath.length, this.checkedDataRealPath.length) }}
            </el-form-item>
            <el-form-item label="描述" prop="description" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.description"></el-input>
            </el-form-item>
            <el-form-item label="最小经度" prop="minX" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.minX" disabled></el-input>
            </el-form-item>
            <el-form-item label="最大经度" prop="maxX" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.maxX" disabled></el-input>
            </el-form-item>
            <el-form-item label="最小纬度" prop="minY" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.minY" disabled></el-input>
            </el-form-item>
            <el-form-item label="最大纬度" prop="maxY" class="publish-data-layer-name">
              <el-input v-model="ruleFormStreet.maxY" disabled></el-input>
            </el-form-item>
          </el-form>
				</div>
        <!--发布完成-->
				<div v-show='stepModule[2]' class="hBasePublishLayerListDetails">
					<h1><i class="el-icon-success"></i>发布成功！</h1>
          <table>
            <tr v-for='(li, index) in tableDatas' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
          </table>
				</div>
        <!-- HBase表格 -->
        <div v-show='showHBaseList' class="hBasePublishLayerListDetails">
          <table>
            <tr v-for='(li, index) in showHBaseListParams' :key='index'>
              <td>{{ li.name }}</td>
              <td>{{ li.value }}</td>
            </tr>
          </table>
        </div>
        <!-- HBase列表数据 -->
        <el-dialog title= '选择数据' :visible.sync="hbaseDialogVisible" :show-close ="true"
          width="50%" center class='publish-service-hbase' :close-on-click-modal='false'>
          <div class='hbase-title'>
            <div class='hbase-title-content'>
              <span>HBase数据源> &nbsp;&nbsp;&nbsp;</span><span>{{ activeHBase }}</span>
            </div>
            <div class='hbase-title-search'>
              <el-input  
                placeholder="请输入内容"
                v-model="hbaseKeyWord" 
                clearable size="small">
              </el-input>
            </div>
          </div>
          <el-table 
            ref="multipleTable" 
            :data="hbaseDataList"             
            highlight-current-row
            class="published-services" 
            v-loading='publishLoad'>
            <el-table-column width="30">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="hbaseRadio" @change.native="hbasetableSelectionChange(scope.row)" :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="layerId" label="id" width='60'></el-table-column> -->
            <el-table-column prop="layerName" label="名称"></el-table-column>
            <el-table-column prop="mimeType" label="瓦片格式" align='center'></el-table-column>
            <el-table-column prop="gridSet" label="瓦片集"></el-table-column>
            <el-table-column prop="levelarea" label="层级范围" width='120' align='center' sortable>
              <template slot-scope="scope">
                {{ scope.row.minLevel }} - {{ scope.row.maxLevel }}
              </template>
            </el-table-column>          
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-pagination
              background
              :current-page="hbaseCurrentPage"
              @current-change="hbaseCurrentChange"
              :page-size="hbasePageSize"
              :total="hbaseTotal"
              layout="total, prev, pager, next">
            </el-pagination>
            <el-button type="primary" size="small" @click="hbaseConfirm">确 定</el-button>
            <el-button size="small" @click="hbaseDialogVisible = false;">取 消</el-button>
          </span>
        </el-dialog>
			</div>
    </div>
    <div class="publish-service-footer" v-show='isPublish[0]'>
			<el-button type="primary" size="small" @click="nextStep">下一步</el-button>
      <el-button size="small" @click="goBack">取消</el-button>
		</div>
    <div class="publish-service-footer" v-show='isPublish[1]'>
			<el-button size="small" @click="prevStep" :disabled="publishFlag">上一步</el-button>
      <el-button type="primary" size="small" @click="publishLayerGroupDatas" :disabled="publishFlag">发布服务</el-button>
      <el-button size="small" @click="goBack" :disabled="publishFlag">取消</el-button>
		</div>
		<div class="publish-service-footer" v-show='isPublish[2]'>
			<el-button type="primary" size="small" @click='gotoPublishList'>进入发布列表</el-button>
		</div>
   </div>
</template>

<script>
import { publishTilePhotoService, resolveOsgbInfo, fileIsExist } from '../api/tiltphotoApi';
import { publishMbtilesService,publishIDBService, getMbtilesDataInfo, getHuaruiDataInfo,publishHbaseService, publishOGCTHbaseService, publishTifService,
 getHbaseLayerList, getOGCTHbaseLayerList, getTifDataInfo, getRocksDBInfo, publishRocksDbService, publishTMbtilesService,
 getTMbtilesDataInfo, getTpkInfo, publishTpkService, getGrstInfo, publishGrstService } from '../api/imageApi';
import ServerDirectoryDialog from './ServerDirectoryDialog';
import DataMnagerDirectory from './DataMnagerDirectory';
import { getServerType, getServerPath } from '../api/fileApi';
import { resolveStreetInfo, publishStreetViewService } from '../api/streetViewApi';
import { getHbaseSourceList } from '../api/serviceApi';
import { publishTerrainLayer, getTerrainLayerInfo } from '../api/tileCacheApi';

export default {
  data() {
    const validateLayerName = (rule, value, callback) => {
      // const patrn = /[\\/\\"<>\\?|\\*]/;
      const reStr = /^[a-zA-Z\u4e00-\u9fa5]{1}/;
      const regEn = /[`~!@#$%^&*()+= <>?:"{},.\\/;'[\]]/im;
      const regCn = /[·！#￥（——）：；“”‘、，…… |《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
          callback(new Error('图层名只能包含数字、中文、字母、下划线、短横线！'));
        } else if(!reStr.test(value)){
          callback(new Error('图层名必须以汉字或字母开头'));
        }else if(value.length > 50){
          callback(new Error('图层名长度不能超过50字符'));
        }else {
          callback();
      }
    };
    const validateLong = (rule, value, callback) => {
      const regPos = /^\d+(\.\d+)?$/; //非负浮点数
      const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(!regPos.test(value) && !regNeg.test(value)){
        callback(new Error('请输入数字'));
      } else if (value > 180 || value < -180) {
        callback(new Error('经度范围为-180 ~ 180!'));
      }else if (value.length > 10) {
        callback(new Error('经度小数点保留5位！'));
      } else {
        callback();
      }
    };
    const validateLat = (rule, value, callback) => {
      const regPos = /^\d+(\.\d+)?$/; //非负浮点数
      const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (!regPos.test(value) && !regNeg.test(value)) {
        callback(new Error('请输入数字'));
      } else if (value > 90 || value < -90) {
        callback(new Error('纬度范围为-90 ~ 90!'));
      } else if (value.length > 10) {
        callback(new Error('纬度小数点保留5位！'));
      } else {
        callback();
      }
    };
    const validateAlt = (rule, value, callback) => {
      const number = /^(0|[1-9][0-9]*)$/ ;
      if(!number.test(value) || value > 8000){
        callback(new Error('中心点高度范围为0-8000，请正确填写！'));
      }else {
        callback();
      }
    };
    const validateMin = (rule, value, callback) => {
      if (!Number.isInteger(this.ruleFormTif.maxLevel)) {
        callback(new Error('请输入数字')); 
      } else if (value > this.ruleFormTif.maxLevel) {
        callback(new Error('最小层级不能大于最大层级'));
      } else if(this.ruleFormTif.gridSet === 'EPSG:3857'&& (this.ruleFormTif.maxLevel>30 || value < 0)) {
        callback(new Error('层级范围0-30'));
      } else if((this.ruleFormTif.gridSet === 'EPSG:4326' || this.ruleFormTif.gridSet === 'EPSG:4490') && (this.ruleFormTif.maxLevel>21 || value <0)){
        callback(new Error('层级范围0-21'));
      } else {
        callback();
      } 
    };   
    return {
      servicetype: [
        { name: '基础影像服务', value: '基础影像服务' },        
        { name: '影像服务', value: '影像服务' },
        { name: '地形服务', value: '地形服务' },
        { name: '倾斜摄影服务', value: '倾斜摄影服务' },
        { name: '时序影像服务', value: '时序影像服务' },
        { name: '街景', value: '街景' },
      ],
      serviceType: '基础影像服务',
      dataSource: [
        { name: 'GV MBTiles', value: 'GV MBTiles' },
        { name: 'GV HBase', value: 'GV HBase' },
        { name: 'GV RocksDB', value: 'GV RocksDB' },        
        { name: 'IECAS GRST', value: 'IECAS GRST' },
        { name: 'ArcGIS Tile Package', value: 'ArcGIS Tile Package' },
        { name: 'Huarui IDB', value: 'Huarui IDB'},
        // { name: 'TIF 目录', value: 'TIF 目录' },
        // { name: 'TIF/IMG 文件', value: 'TIF/IMG 文件' },
      ],
      dataSourceType: 'GV MBTiles',
      breadcrumb: '#/servicemanager',
      rootUrl: 'null',
      stepModule: [true, false, false],
      showHBaseList: false,
      active: 0,
      number: 0,
      disabled: false,
      ruleForm: [false, false, false, false, false],
      publishLoad: false, // 发布服务的loading
      isPublish: [true, false, false], // 判断是否已发布
      isCheckFolder: true, // 是否需要勾选文件夹
      ruleFormImgSql: {
        layerName: '',
        path: '',
        gridSet: '',
        mimeType: '',
        minX: '',
        maxX: '',
        minY: '',
        maxY: '',
        minLevel: '',
        maxLevel: '',
      },
      rulesFormImgSql: {
        layerName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ]
      },
      ruleFormTif: {
        layerName: '',
        gridSet: 'EPSG:4326',
        mimeType: 'PNG',
        path: '',
        minLevel: '',
        maxLevel: '',
      },
      ruleFormHBase: {
        gridSet: '',
        layerName: '',
        maxLevel: '',
        maxX: '',
        maxY: '',
        mimeType: '',
        minLevel: '',
        minX: '',
        minY: '',
      },
      ruleFormRocksDb: {
        gridSet: '',
        layerName: '',
        maxLevel: '',
        maxX: '',
        maxY: '',
        mimeType: '',
        minLevel: '',
        minX: '',
        minY: '',
        tileType: 'IMAGE',
      },
      ruleFormTerrain: {
        layerName: '',
        path: '',
      },
      ruleFormTilePhoto: {
        name: '',
        dir: '',
        format: '',
        longitude: 0,
        latitude: 0,
        altitude: 0,
      },
      ruleFormStreet: {
        svName: '',
        description: '',
        dir: '',
        maxX: '',
        maxY: '',
        minX: '',
        minY: '',
      },
      rulesFormTif: {
        layerName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
        minLevel: [
          { required: true, message: '请输入层级范围', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur'},
          { validator: validateMin, trigger: 'blur' },
        ],
        // mimeType: [
        //   { required: true, message: '请输入mimeType', trigger: 'blur' },
        // ],
      },
      rulesHBase: {
        layerName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
      },
      rulesRocksDb: {
        layerName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
      },
      rulesTerrain: {
        layerName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
      },
      rulesTilePhoto: {
        name: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
        dir: [
          { required: true, message: '请输入文件路径', trigger: 'blur' },
        ],
        longitude: [
          { required: true, message: '请输入中心点经度', trigger: 'blur' },
          { validator: validateLong, trigger: 'blur' },
        ],
        latitude: [
          { required: true, message: '请输入中心点纬度', trigger: 'blur' },
          { validator: validateLat, trigger: 'blur' },
        ],
        altitude: [
          { required: true, message: '请输入中心点高度', trigger: 'blur' },
          { validator: validateAlt, trigger: 'blur' },
        ],
      },
      rulesStreet: {
        svName: [
          { required: true, message: '请输入图层名称', trigger: 'blur' },
          { validator: validateLayerName, trigger: 'blur' },
        ],
      },
      tableDatas: [],
      checkedDataPath: '', // 选中的节点的路径
      checkedDataRealPath: '', // 选中的节点的真实路径
      checkedFilePath: '', // 确定选中的节点的路径
      hbaseDataList: [],
      hbaseData: {}, //包括hbase列表，以及总数
      hbaseDialogVisible: false,
      showHBaseListTable: [],
      showHBaseListParams: [],
      hbaseSelections: [],
      hbaseRadio: null,
      serverType: '', // 服务器类型
      publishFlag: false, // 按钮是否禁用
      dmDialogVisible: false, // 数管弹出框
      importExportType: '1', // 用于区分数据的导入导出
      serverPath: '',// 服务器import-data前面的路径
      extName: '',
      activeHBase: '',
      hbaseTitle: '',
      currentHBaseData: '',
      hbaseCurrentPage: 1,  //当前页
      hbasePageSize: 10,
      hbaseTotal: 10,
      hbaseKeyWord: '', //搜索hbase列表的关键词
    };
  },
  props: {
    serviceTypeProp: {
      type: String,
      default: '',
    },
    isGoBackInit: {
      type: Boolean,
    },
  },
  watch: {
    dataSourceType() {
      if (this.dataSourceType === 'Huarui IDB' || this.dataSourceType === 'GV MBTiles' || this.dataSourceType === 'GV MBTiles(History)' || this.dataSourceType === 'GV RocksDB' || this.dataSourceType === 'TIF 目录' || this.dataSourceType === 'GV MBTiles(Terrain)' || this.dataSourceType === 'IECAS GRST(Terrain)' || this.dataSourceType === 'OSGB' || this.dataSourceType === '3DTiles' || this.dataSourceType === '3DTiles(Grid)' || this.dataSourceType === 'IECAS GRST' || this.serviceType === '街景') {
        this.isCheckFolder = true; // 需要勾选文件夹
      } else {
        this.isCheckFolder = false; // 默认不需要勾选文件夹
      }
    },
    serviceTypeProp(val) {
      this.serviceType = val;
      this.tabDataSource(val);
    },
    isGoBackInit() {
      this.active = 0;
      this.disabled = false;
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.stepModule = [true, false, false];
      this.isPublish = [true, false, false];
      this.showHBaseList = false;
      this.publishLoad = false;
    },
    async hbaseKeyWord() {
      this.publishLoad = true;
      if (this.dataSourceType === "GV HBase") {
        this.hbaseData = await getHbaseLayerList(this.hbaseKeyWord,1,this.hbasePageSize);
      } else if (this.dataSourceType === "GV HBase(History)") {
        this.hbaseData = await getOGCTHbaseLayerList( this.hbaseKeyWord,1,this.hbasePageSize );
      }
      this.publishLoad = false;
      this.hbaseDataList = this.hbaseData.metaList; //hbase列表
      this.hbaseTotal = this.hbaseData.total; //hbase总数
    }
  },
  async mounted() {
    this.serverType = await getServerType();
    this.serverPath = await getServerPath();
  },
  methods: {  
    // 切换数据类型
    tabDataSource(val) {
      this.dataSourceType = '';
      switch (val) {
        case '基础影像服务':
          this.dataSource = [
            { name: 'GV MBTiles', value: 'GV MBTiles' },
            { name: 'GV HBase', value: 'GV HBase' },
            { name: 'GV RocksDB', value: 'GV RocksDB' },            
            { name: 'IECAS GRST', value: 'IECAS GRST' },
            { name: 'ArcGIS Tile Package', value: 'ArcGIS Tile Package' },
            { name: 'Huarui IDB', value: 'Huarui IDB'},
          ];
          this.dataSourceType = 'GV MBTiles';
          break;
        case '时序影像服务':
          this.dataSource = [
            { name: 'GV MBTiles(History)', value: 'GV MBTiles(History)' },
            { name: 'GV HBase(History)',value:'GV HBase(History)'},
          ];
          this.dataSourceType = 'GV MBTiles(History)';
          break;
        case '影像服务':
          this.dataSource = [
            { name: 'TIF 目录', value: 'TIF 目录' },
            { name: 'TIF/IMG 文件', value: 'TIF/IMG 文件' },
          ];
          this.dataSourceType = 'TIF 目录';
          break;
        case '地形服务':
          this.dataSource = [
            { name: 'GV MBTiles(Terrain)', value: 'GV MBTiles(Terrain)' },
            { name: 'IECAS GRST(Terrain)', value: 'IECAS GRST(Terrain)' },
            // { name: 'TIF 文件', value: 'TIF 文件' },
          ];
          this.dataSourceType = 'GV MBTiles(Terrain)';
          break;
        case '倾斜摄影服务':
          this.dataSource = [
            { name: 'OSGB', value: 'OSGB' },
            { name: '3DTiles', value: '3DTiles' },
            { name: '3DTiles(Grid)', value: '3DTiles(Grid)' },
          ];
          this.dataSourceType = 'OSGB';
          break;
        default:
          this.dataSource = [];
          break;
      }
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.showHBaseListParams = [];
      this.publishLoad = false;
    },
    // 切换数据源
    async setCheckDataPath() {
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.showHBaseListParams = [];
      this.publishLoad = false;
      this.extName = '';
      if (this.dataSourceType === "GV HBase" || this.dataSourceType === "GV HBase(History)") {
        this.activeHBase = await this.getActiveDataSource();
      }
      // this.hbaseTitle = '集群>' + "    " + this.activeHBase
    },
    //点击页码，刷新页面
    async hbaseCurrentChange(val) {
      this.hbaseRadio = null; //清空选择项
      this.hbaseSelections = [];
      this.hbaseCurrentPage = val;
      this.publishLoad = true;
      if (this.dataSourceType === "GV HBase") {
        this.hbaseData = await getHbaseLayerList(this.hbaseKeyWord,val,this.hbasePageSize);
      } else if (this.dataSourceType === "GV HBase(History)") {
        this.hbaseData = await getOGCTHbaseLayerList( this.hbaseKeyWord,val,this.hbasePageSize );
      }
      this.publishLoad = false;
      this.hbaseDataList = this.hbaseData.metaList; //hbase列表
      this.hbaseTotal = this.hbaseData.total; //hbase总数
    },
    // 选择数据
    async showServerDirectory() {
      if (this.dataSourceType || this.serviceType === "街景") {
        if (this.dataSourceType === "GV HBase") {
          if(this.activeHBase === false){
            this.$message.warning({ message: '无可用HBase数据源', showClose: true });
            return;
          }
          this.hbaseRadio = null; //清空选择项
          this.hbaseKeyWord = ''; //清空搜索框的选项，
          this.hbaseSelections = [];
          this.publishLoad = true;
          this.hbaseDialogVisible = true;
          this.hbaseData = await getHbaseLayerList('',1,this.hbasePageSize);
          this.hbaseDataList = this.hbaseData.metaList; //hbase列表
          this.hbaseTotal = this.hbaseData.total; //hbase总数
          this.publishLoad = false;
        } else if (this.dataSourceType === "GV HBase(History)") {
          if (this.activeHBase === false) {
            this.$message.warning({ message: '无可用HBase数据源', showClose: true });
            return;
          }
          this.hbaseRadio = null; //清空选择项
          this.hbaseKeyWord = ''; //清空搜索框的选项，
          this.hbaseSelections = [];
          this.publishLoad = true;
          this.hbaseDialogVisible = true;
          this.hbaseData = await getOGCTHbaseLayerList('',1,this.hbasePageSize);
          this.hbaseDataList = this.hbaseData.metaList; //时序影像hbase列表
          this.hbaseTotal = this.hbaseData.total; //hbase总数
          this.publishLoad = false; 
        }
        else {
          this.$refs.serverDirectoryDialog.checkTargetFile = true;
          // this.dmDialogVisible = true;
        }
      } else {
        this.$message.warning({ message: '请选择HBase数据源', showClose: true });
      }
    },
    hbasetableSelectionChange(row) {
      this.hbaseSelections = [];
      this.hbaseSelections.push(row);
    },
    //获取启动的集群名称
    async getActiveDataSource() {
        var activeCluster = false;
        var hosts = [];
        var name = '';
        var hostsList = [];
        var port = '';
        await getHbaseSourceList().then((cluster)=>{
          cluster.forEach(element => {
            if(element.active === true){
              name = element.name;
              hosts = element.hosts;
              hosts.forEach((host) => {
                hostsList.push(host['host'])
              })
              port = element.port;
              activeCluster = name + '（' + hostsList.join(",") + ':' + port + '）'
            }
          });           
        }).catch(() => {
        activeCluster = false;
      });
        return activeCluster
    },
    // HBase确定
    async hbaseConfirm() {
      if (this.hbaseSelections.length === 1) {
        // this.showHBaseList = true;
        this.hbaseDialogVisible = false;
        this.showHBaseListParams = [
          {name: '图层名称', value: this.hbaseSelections[0].layerName},
          {name: '瓦片格式', value: this.hbaseSelections[0].mimeType},
          {name: '格网集', value: this.hbaseSelections[0].gridSet},
          {name: '层级范围', value: `${this.hbaseSelections[0].minLevel}-${this.hbaseSelections[0].maxLevel}`},
          // {name: 'id', value: this.hbaseSelections[0].layerId},
        ];
        this.showHBaseListTable = this.hbaseSelections;
        this.checkedDataPath = this.hbaseSelections[0].layerName;
        this.checkedDataRealPath = this.hbaseSelections[0].layerName;
        this.currentHBaseData = this.hbaseSelections[0].layerName;
      } else if (this.hbaseSelections.length > 1 ) {
        this.$message.warning({ message: '请选择一条数据!', showClose: true });
      } else if (this.hbaseSelections.length < 1 ) {
        this.$message.warning({ message: '当前没有数据，请您选择要添加的数据', showClose: true });
      }
    },
    // 选择完数据点击确定
    checkedDataConfrim(checkedTableData) {
      if (checkedTableData.length === 0) {
        this.$message.warning({ message: '请选择一条数据', showClose: true });
        return;
      }
      if (this.dataSourceType !== 'TIF/IMG 文件' && this.dataSourceType !== 'ArcGIS Tile Package' && checkedTableData.type === 'file') {
        this.checkedFilePath = '';
        this.$message.warning({ message: '请选择文件夹类型', showClose: true });
        return;
      }
      this.checkedDataPath = checkedTableData.path;
      this.checkedDataRealPath = checkedTableData.fileRealPath;
      this.$refs.serverDirectoryDialog.checkTargetFile = false;
    },    
    // 设置参数-进行发布
    publishLayerGroupDatas() {
      if ( this.serviceType === '基础影像服务' ) {
        this.publishBaseImage();
      } else if ( this.serviceType === '影像服务' ) {
        this.publishImage();
      } else if ( this.serviceType === '地形服务' ) {
        this.publishTerrain();
      } else if ( this.serviceType === '倾斜摄影服务' ) {
        this.publishTilePhoto();
      } else if ( this.serviceType === '时序影像服务') {
        this.publishTimeImage();
      } else if ( this.serviceType === '街景') {
         this.publishStreetView();
      }  
    },
    //设置参数，发布基础影像的服务
    async publishBaseImage() {
      if (this.dataSourceType === 'GV MBTiles') {
        this.setOptions('ruleFormImgSql', this.ruleFormImgSql, '');
        const mbTilesParams = {
          layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' 
          + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
          path: this.ruleFormImgSql.path,
          gridSet: this.ruleFormImgSql.gridSet,
          mimeType: this.ruleFormImgSql.mimeType,
          minX: this.ruleFormImgSql.minX,
          maxX: this.ruleFormImgSql.maxX,
          minY: this.ruleFormImgSql.minY,
          maxY: this.ruleFormImgSql.maxY,
          minLevel: this.ruleFormImgSql.minLevel,
          maxLevel: this.ruleFormImgSql.maxLevel,
          isBase: true,
        };
        this.setOptions('ruleFormImgSql', mbTilesParams, publishMbtilesService);
        return;
      } else if (this.dataSourceType === 'GV HBase') {
        this.setOptions('ruleFormHBase', hBaseParams, '');
        const hBaseParams = {          
          layerName: this.ruleFormHBase.layerName + '-' + this.ruleFormHBase.mimeType + '-'
           + this.ruleFormHBase.gridSet.slice(this.ruleFormHBase.gridSet.indexOf(':') + 1, this.ruleFormHBase.gridSet.length),
          gridSet: this.ruleFormHBase.gridSet,
          mimeType: this.ruleFormHBase.mimeType,
          minX: this.ruleFormHBase.minX,
          minY: this.ruleFormHBase.minY,
          maxX: this.ruleFormHBase.maxX,
          maxY: this.ruleFormHBase.maxY,
          minLevel: this.ruleFormHBase.minLevel,
          maxLevel: this.ruleFormHBase.maxLevel,
          layerId: this.ruleFormHBase.layerId,
          tableName: this.ruleFormHBase.tableName,
          regionNum: this.ruleFormHBase.regionNum,
          isBase: true,
          isEncrypt: this.ruleFormHBase.isEncrypt,
        };
        this.setOptions('ruleFormHBase', hBaseParams, publishHbaseService);
        return;
      } else if (this.dataSourceType === 'GV RocksDB') {
        this.setOptions('ruleFormRocksDb', this.ruleFormRocksDb, '');
        const rocksDbParams = {
          gridSet: this.ruleFormRocksDb.gridSet,
          path: this.ruleFormRocksDb.path,
          layerName: this.ruleFormRocksDb.layerName + '-' + this.ruleFormRocksDb.mimeType + '-' 
          + this.ruleFormRocksDb.gridSet.slice(this.ruleFormRocksDb.gridSet.indexOf(':') + 1, this.ruleFormRocksDb.gridSet.length),
          maxLevel: this.ruleFormRocksDb.maxLevel,
          maxX: this.ruleFormRocksDb.maxX,
          maxY: this.ruleFormRocksDb.maxY,
          mimeType: this.ruleFormRocksDb.mimeType,
          minLevel: this.ruleFormRocksDb.minLevel,
          minX: this.ruleFormRocksDb.minX,
          minY: this.ruleFormRocksDb.minY,
          isBase: true,
          isTerrain: false,
          zip: true,
        };
        this.setOptions('ruleFormRocksDb', rocksDbParams, publishRocksDbService);
        return;
      } else if (this.dataSourceType === 'ArcGIS Tile Package') {
        this.setOptions('ruleFormImgSql', this.ruleFormImgSql, '');
        const tpkParams = {
          layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' 
          + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
          path: this.ruleFormImgSql.path,
          gridSet: this.ruleFormImgSql.gridSet,
          mimeType: this.ruleFormImgSql.mimeType,
          minX: this.ruleFormImgSql.minX,
          maxX: this.ruleFormImgSql.maxX,
          minY: this.ruleFormImgSql.minY,
          maxY: this.ruleFormImgSql.maxY,
          minLevel: this.ruleFormImgSql.minLevel,
          maxLevel: this.ruleFormImgSql.maxLevel,
          // isBase: true,
        };
        this.setOptions('ruleFormImgSql', tpkParams, publishTpkService);
        return;
      } else if (this.dataSourceType === 'IECAS GRST') {
        this.setOptions('ruleFormImgSql', this.ruleFormImgSql, '');
        const grstParams = {
          layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' 
          + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
          path: this.ruleFormImgSql.path,
          gridSet: this.ruleFormImgSql.gridSet,
          mimeType: this.ruleFormImgSql.mimeType,
          minX: this.ruleFormImgSql.minX,
          maxX: this.ruleFormImgSql.maxX,
          minY: this.ruleFormImgSql.minY,
          maxY: this.ruleFormImgSql.maxY,
          minLevel: this.ruleFormImgSql.minLevel,
          maxLevel: this.ruleFormImgSql.maxLevel,
          isBase: true,
        };
        this.setOptions('ruleFormImgSql', grstParams, publishGrstService);
        return;
      } else if (this.dataSourceType === 'Huarui IDB') {
        this.setOptions('ruleFormImgSql', this.ruleFormImgSql, '');
        const IDBParams = {
          layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' 
          + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
          path: this.ruleFormImgSql.path,
          gridSet: this.ruleFormImgSql.gridSet,
          mimeType: this.ruleFormImgSql.mimeType,
          minX: this.ruleFormImgSql.minX,
          maxX: this.ruleFormImgSql.maxX,
          minY: this.ruleFormImgSql.minY,
          maxY: this.ruleFormImgSql.maxY,
          minLevel: this.ruleFormImgSql.minLevel,
          maxLevel: this.ruleFormImgSql.maxLevel,
          isBase: true,
        };
        this.setOptions('ruleFormImgSql', IDBParams, publishIDBService);
      }
    },
    //发布影像
    async publishImage() {
      if (this.dataSourceType === 'TIF 目录' || this.dataSourceType === 'TIF/IMG 文件') {
        const regPos = /^\d+(\.\d+)?$/; //非负浮点数
        this.checkLevel(regPos);
        this.setOptions('ruleFormTif', tifParams, '');
        const tifParams = {
          layerName: this.ruleFormTif.layerName + '-' + this.ruleFormTif.mimeType + '-' 
          + this.ruleFormTif.gridSet.slice(this.ruleFormTif.gridSet.indexOf(':') + 1, this.ruleFormTif.gridSet.length),
          gridSet: this.ruleFormTif.gridSet,
          mimeType: this.ruleFormTif.mimeType,
          filePath: this.ruleFormTif.path,
          minLevel: this.ruleFormTif.minLevel,
          maxLevel: this.ruleFormTif.maxLevel,
          minX: this.ruleFormTif.minX,
          maxX: this.ruleFormTif.maxX,
          minY: this.ruleFormTif.minY,
          maxY: this.ruleFormTif.maxY,
          dataType: 'image',
          "dataEntityId": '',
          "charCode": "UTF-8",
          "needSeed": false,
          "transparentColor": '',
          "styleName": '',
          "dataLocation": '',
          "shpName": '',
        };
        this.setOptions('ruleFormTif', tifParams, publishTifService);
        return;
      } else if (this.dataSourceType === 'TIF 文件') {// 地形
        this.setOptions('ruleFormTerrain', terrainParams, '');
        const levelRange = await getTerrainLayerInfo(encodeURI(this.checkedDataPath));
        const terrainParams = {
          "dataEntityId": -1,
          "dataPath": this.checkedDataPath,
          "dataType": "dem",
          "gridSet": 4326,
          "minLevel": levelRange.result.min,
          "maxLevel": levelRange.result.max,
          "mimeType": this.ruleFormTerrain.mimeType,
          "taskName": this.ruleFormTerrain.layerName + '-' + this.ruleFormTerrain.mimeType + '-'
           + this.ruleFormTerrain.gridSet.slice(this.ruleFormTerrain.gridSet.indexOf(':') + 1, this.ruleFormTerrain.gridSet.length),
          "tileType": "mbtiles",
          "type": "dem"
        };
        this.setOptions('ruleFormTerrain', terrainParams, publishTerrainLayer);
        return;
      }
    },
    //发布地形
    async publishTerrain() {
      if (this.dataSourceType === 'GV MBTiles(Terrain)') {
        this.setOptions('ruleFormTerrain', terrainParams, '');
        const terrainParams = {
          layerName: this.ruleFormTerrain.layerName + '-' + this.ruleFormTerrain.mimeType + '-'
           + this.ruleFormTerrain.gridSet.slice(this.ruleFormTerrain.gridSet.indexOf(':') + 1, this.ruleFormTerrain.gridSet.length),
          path: this.checkedDataPath,
          gridSet: this.ruleFormTerrain.gridSet,
          mimeType: this.ruleFormTerrain.mimeType,          
          minX: this.ruleFormTerrain.minX,
          maxX: this.ruleFormTerrain.maxX,
          minY: this.ruleFormTerrain.minY,
          maxY: this.ruleFormTerrain.maxY,
          minLevel: this.ruleFormTerrain.minLevel,
          maxLevel: this.ruleFormTerrain.maxLevel,
          isBase: false,
          isTerrain: true,
        };
        this.setOptions('ruleFormTerrain', terrainParams, publishMbtilesService);
        return;
      } else if (this.dataSourceType === 'IECAS GRST(Terrain)') {
        this.setOptions('ruleFormTerrain', terrainParams, '');
        const terrainParams = {
          layerName: this.ruleFormTerrain.layerName + '-' + this.ruleFormTerrain.mimeType + '-'
           + this.ruleFormTerrain.gridSet.slice(this.ruleFormTerrain.gridSet.indexOf(':') + 1, this.ruleFormTerrain.gridSet.length),
          path: this.checkedDataPath,
          gridSet: this.ruleFormTerrain.gridSet,
          mimeType: this.ruleFormTerrain.mimeType,          
          minX: this.ruleFormTerrain.minX,
          maxX: this.ruleFormTerrain.maxX,
          minY: this.ruleFormTerrain.minY,
          maxY: this.ruleFormTerrain.maxY,
          minLevel: this.ruleFormTerrain.minLevel,
          maxLevel: this.ruleFormTerrain.maxLevel,
          isBase: false,
          isTerrain: true,
        };
        this.setOptions('ruleFormTerrain', terrainParams, publishGrstService);
        return;
      }
    },
    //发布倾斜摄影
    async publishTilePhoto() {
      if (this.dataSourceType === 'OSGB' || this.dataSourceType === '3DTiles' || this.dataSourceType === '3DTiles(Grid)') {
        this.setOptions('ruleFormTilePhoto', tilePhotoParams, '');
        const tilePhotoParams = {
          layerName: this.ruleFormTilePhoto.name,
          format: this.ruleFormTilePhoto.format,
          dir: this.ruleFormTilePhoto.dir,
          longitude: this.ruleFormTilePhoto.longitude,
          latitude: this.ruleFormTilePhoto.latitude,
          altitude: this.ruleFormTilePhoto.altitude,
        };
        this.setOptions('ruleFormTilePhoto', tilePhotoParams, publishTilePhotoService);
        return;
      }
    },
    //发布时序影像
    async publishTimeImage() {
      if (this.dataSourceType === 'GV MBTiles(History)') {
        this.setOptions('ruleFormImgSql', this.ruleFormImgSql, '');
        const tMbTilesParams = {
          layerName: this.ruleFormImgSql.layerName + '-' + this.ruleFormImgSql.mimeType + '-' 
          + this.ruleFormImgSql.gridSet.slice(this.ruleFormImgSql.gridSet.indexOf(':') + 1, this.ruleFormImgSql.gridSet.length),
          path: this.ruleFormImgSql.path,
          gridSet: this.ruleFormImgSql.gridSet,
          mimeType: this.ruleFormImgSql.mimeType,
          minX: this.ruleFormImgSql.minX,
          maxX: this.ruleFormImgSql.maxX,
          minY: this.ruleFormImgSql.minY,
          maxY: this.ruleFormImgSql.maxY,
          minLevel: this.ruleFormImgSql.minLevel,
          maxLevel: this.ruleFormImgSql.maxLevel,
          isBase: false,
          isEncrypt: false,
          isTerrain: false,
        };
        this.setOptions('ruleFormImgSql', tMbTilesParams, publishTMbtilesService);
        return;
      } else if (this.dataSourceType === 'GV HBase(History)') {
        this.setOptions('ruleFormHBase', hBaseParams, '');
        const hBaseParams = {          
          layerName: this.ruleFormHBase.layerName + '-' + this.ruleFormHBase.mimeType + '-'
           + this.ruleFormHBase.gridSet.slice(this.ruleFormHBase.gridSet.indexOf(':') + 1, this.ruleFormHBase.gridSet.length),
          gridSet: this.ruleFormHBase.gridSet,
          mimeType: this.ruleFormHBase.mimeType,
          minX: this.ruleFormHBase.minX,
          minY: this.ruleFormHBase.minY,
          maxX: this.ruleFormHBase.maxX,
          maxY: this.ruleFormHBase.maxY,          
          minLevel: this.ruleFormHBase.minLevel,
          maxLevel: this.ruleFormHBase.maxLevel,
          layerId: this.ruleFormHBase.layerId,
          tableName: this.ruleFormHBase.tableName,
          regionNum:this.ruleFormHBase.regionNum,
          subLayers:this.ruleFormHBase.subLayers, //时序影像HBase新增
          isBase: false,
          isEncrypt: this.ruleFormHBase.isEncrypt,
        };
        this.setOptions('ruleFormHBase', hBaseParams, publishOGCTHbaseService);
        return;
      }
    },
    //发布街景服务
    async publishStreetView() {
      if (this.serviceType === '街景') {
        this.setOptions('ruleFormStreet', this.ruleFormStreet, '');
        const streetParams = {
          svName: this.ruleFormStreet.svName,
          dir: this.ruleFormStreet.dir,
          description: this.ruleFormStreet.description,          
          minX: this.ruleFormStreet.minX,
          maxX: this.ruleFormStreet.maxX,
          minY: this.ruleFormStreet.minY,
          maxY: this.ruleFormStreet.maxY,
        };
        this.setOptions('ruleFormStreet', streetParams, publishStreetViewService);
        return;
      }
    },
    // 校验层级范围
    checkLevel(regPos) {
      if (!regPos.test(this.ruleFormTif.minLevel) || !regPos.test(this.ruleFormTif.maxLevel) ||  this.ruleFormTif.maxLevel < this.ruleFormTif.minLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      } else if (this.ruleFormTif.gridSet === "EPSG:4326" && 21 < this.ruleFormTif.maxLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      } else if (this.ruleFormTif.gridSet === "EPSG:3857" && 30 < this.ruleFormTif.maxLevel) {
        this.$message.warning({ message: '请填写正确的层级范围！', showClose: true });
        return;
      }
    },
    // 设置参数
    async setOptions(refObj, ruleForm, funObj) {
      const imagesFileTab = {
        layerName: '图层名称',
        mimeType: '瓦片格式',
        gridSet: '格网集',
        minLevel: '层级范围',
        name: '图层名称',
        format: '数据类型',
        createTime: '创建时间',
        svName: '图层名称',
        // longitude: '中心点经度',
      };
      try{
        this.$refs[refObj].validate((valid) => {
          if (valid) {
            this.publishLoad = true;
            this.publishFlag = true;
            funObj(ruleForm).then((res) => {
              this.stepModule = [false, false, false];
              this.active = 3; 
              this.stepModule[2] = true;
              this.showHBaseList = false;
              this.addTab(res, imagesFileTab);
              this.publishLoad = false;
              this.publishFlag = false;
              this.isPublish = [false, false, true];
              this.$refs[refObj].resetFields();
            }).catch(() => {
              this.publishLoad = false;
              this.publishFlag = false;
              // this.$message.error({ message: error, showClose: true });
            });
          } else {
            // this.$message.warning({ message: '请输入完整参数', showClose: true });
            // setTimeout(() => {
            //   this.$refs[refObj].clearValidate();
            // }, 1000);
          }
        });
       } catch(e){
        //  this.$message.warning({ message: err, showClose: true });
       }
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    // 计算层级范围的函数
    computeLevelRange(rasterX, rasterY, minX, minY, maxX, maxY) {
      const defaulttilesize = 256;
      // 数组0为经度，1为纬度 左下
      let leftDown = [minX, minY];
      // 右上经纬度
      let rightUp = [maxX, maxY];
      const xl = rightUp[0] - leftDown[0];
      const yl = rightUp[1] - leftDown[1];
      const levelZeroRange = 180.0;
      // 获取每个像素对应的经纬跨度
      const xr = xl / rasterX;
      const yr = yl / rasterY;
      const resolutions = [ xr, yr ];
      const levelatX = (Math.log(Math.abs(resolutions[0] * defaulttilesize) / levelZeroRange) / Math.log(0.5));
      const levelatY = (Math.log(Math.abs(resolutions[1] * defaulttilesize) / levelZeroRange) / Math.log(0.5));
      const bestSuit = Math.ceil(((levelatX + levelatY) / 2.0) - 0.4);
      const step = xl > yl ? xl : yl;
      const maxLevel = bestSuit;
      let minLevel = Math.log(180.0 / step) / Math.log(2.0) - 0.4;
      minLevel = Math.max(minLevel, 0);
      return [minLevel, maxLevel];
    },
    //切换格网集，改变层级
    async changeLevel() {
      const levelArray = await getTifDataInfo(encodeURI(this.checkedDataPath),this.ruleFormTif.gridSet);
      this.ruleFormTif = Object.assign(this.ruleFormTif, levelArray);
    },
    // 校验   基础影像
    async checkSourceType() {
      this.ruleForm = [false, false, false, false, false, false, false];
      if (this.dataSourceType === 'GV MBTiles') {
        await getMbtilesDataInfo(encodeURI(this.checkedDataPath));
        this.imageService();
      } else if (this.dataSourceType === 'GV RocksDB') {
        await getRocksDBInfo(encodeURI(this.checkedDataPath));
        this.imageService();
      } else if (this.dataSourceType === 'ArcGIS Tile Package') {
        await getTpkInfo(encodeURI(this.checkedDataPath));
        this.imageService();
      } else if (this.dataSourceType === 'IECAS GRST') {
        const grstInfo = await getGrstInfo(encodeURI(this.checkedDataPath));
        if (grstInfo.layerType !== 'IMAGELAYER') {
          this.$message.warning({ message: '请选择基础影像的GRST数据！', showClose: true });
          return;
        }
        this.imageService();
      } else if( this.dataSourceType === 'Huarui IDB') {
        await getHuaruiDataInfo(this.checkedDataPath);
        this.imageService();
      } else {
        this.imageService();
      }
      this.active++;
      this.isPublish = [false, true, false];
      this.stepModule = [false, false, false];
      this.disabled = true;
      this.stepModule[this.active] = true;
    },
    //校验影像
    async checkSourceType1() {
      this.ruleForm = [false, false, false, false, false, false, false];
      if (this.serviceType === '时序影像服务') {
        if(this.dataSourceType === 'GV HBase(History)')
        { 
          this.timeImageService();
        }
        else{
          const results = await getTMbtilesDataInfo(encodeURI(this.checkedDataPath));
          if (!results) {
            this.$message.warning({ message: '数据格式不正确，请重新选择！', showClose: true });
            return;
          }
          this.timeImageService();
        }
        
      } else if (this.serviceType === '影像服务') {
        await getTifDataInfo(encodeURI(this.checkedDataPath),'EPSG:4326');
        this.imageService();
      }
      this.active++;
      this.isPublish = [false, true, false];
      this.stepModule = [false, false, false];
      this.disabled = true;
      this.stepModule[this.active] = true;
    },
    // 校验 倾斜摄影、街景
    async checkSourceType2() {
      this.ruleForm = [false, false, false, false, false, false, false];
      if (this.serviceType === '倾斜摄影服务') {
        await fileIsExist(this.checkedDataPath, this.tilePhotoTypeCheck());
        this.tilePhotoService();
      } else if (this.serviceType === '街景') {
        //await resolveStreetInfo(encodeURI(this.checkedDataPath));
        await resolveStreetInfo(this.checkedDataPath); //post方法不对地址中的中文进行编码
        this.streetViewService();
      }
      this.active++;
      this.isPublish = [false, true, false];
      this.stepModule = [false, false, false];
      this.disabled = true;
      this.stepModule[this.active] = true;
    },
    // 校验  地形
    async checkSourceType3() {
      this.ruleForm = [false, false, false, false, false, false, false];
      if (this.dataSourceType === 'GV MBTiles(Terrain)') {
        await getMbtilesDataInfo(encodeURI(this.checkedDataPath));
        this.demServiceMbtiles();
      } else if (this.dataSourceType === 'IECAS GRST(Terrain)') {
        const grstInfo = await getGrstInfo(encodeURI(this.checkedDataPath));
        if (grstInfo.layerType !== 'DEMLAYER') {
          this.$message.warning({ message: '请选择地形的GRST数据！', showClose: true });
          return;
        }
        this.demServiceGrst();
      } else {
        await getTerrainLayerInfo(encodeURI(this.checkedDataPath));
        this.demServiceTif();
      }
      this.active++;
      this.isPublish = [false, true, false];
      this.stepModule = [false, false, false];
      this.disabled = true;
      this.stepModule[this.active] = true;
    },
    // 影像服务
    async imageService() {
      if (this.dataSourceType === 'GV MBTiles') {
        this.imageServiceMBTiles();
      } else if (this.dataSourceType === 'GV RocksDB') {
        this.imageServiceRocksDB();
      } else if (this.dataSourceType === 'GV HBase' || this.dataSourceType === 'GV HBase(History)') {
        this.ruleForm[2] = true;
        if(this.showHBaseListTable.length > 0){
          this.ruleFormHBase = this.showHBaseListTable[0];
          this.ruleFormHBase.mimeType = this.showHBaseListTable[0].mimeType;
          this.ruleFormHBase.layerName = this.showHBaseListTable[0].layerName;
        }
      } else if (this.dataSourceType === 'ArcGIS Tile Package') {
        this.imageServiceTpk();
      } else if (this.dataSourceType === 'IECAS GRST') {
        this.imageServiceGrst();
      } else if (this.dataSourceType === 'Huarui IDB'){
        this.imageServiceIDB();
      } else if (this.dataSourceType === 'TIF 目录') {
        this.ruleForm[3] = true;
        if (this.$refs['ruleFormTif']) {
          this.$refs['ruleFormTif'].clearValidate();
        }
        this.ruleFormTif.path = this.checkedDataPath;
        // 获取参数值
        const levelArray = await getTifDataInfo(encodeURI(this.checkedDataPath),this.ruleFormTif.gridSet);
        this.ruleFormTif = Object.assign(this.ruleFormTif, levelArray);
      } else if (this.dataSourceType === 'TIF/IMG 文件') {
        this.ruleForm[3] = true;
        if (this.$refs['ruleFormTif']) {
          this.$refs['ruleFormTif'].clearValidate();
        }
        this.ruleFormTif.path = this.checkedDataPath;
        // 获取参数值
        const levelArray = await getTifDataInfo(encodeURI(this.checkedDataPath),this.ruleFormTif.gridSet);
        this.ruleFormTif = Object.assign(this.ruleFormTif, levelArray);
        // 获取文件的后缀 当位img时 格网集只能是4326  现在img支持3857、4490格式
        this.extName = this.checkedDataPath.slice(this.checkedDataPath.lastIndexOf('.') + 1, this.checkedDataPath.length);
      }
    },
    // 影像服务处理mbtiles
    async imageServiceMBTiles() {
      this.ruleForm[0] = true;
      const resultDatas = await getMbtilesDataInfo(encodeURI(this.checkedDataPath));
      // 将获取数据赋给ruleFormImgSql
      if (resultDatas) {
        if (this.$refs['ruleFormImgSql']) {
          this.$refs['ruleFormImgSql'].clearValidate();
        }
        if (!resultDatas.layerName) {
          resultDatas.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        }
        this.ruleFormImgSql = resultDatas;
        // this.ruleFormImgSql.layerName= this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormImgSql.path = this.checkedDataPath;
      } else {
        return;
      }
    },
    // 影像服务处理rocksdb
    async imageServiceRocksDB() {
      this.ruleForm[6] = true;
      const resultDatas = await getRocksDBInfo(encodeURI(this.checkedDataPath));
      // 将获取数据赋给ruleFormImgSql
      if(resultDatas){
        if(this.$refs['ruleFormRocksDb']){
          this.$refs['ruleFormRocksDb'].clearValidate();
        }
        resultDatas.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormRocksDb = resultDatas;
       // this.ruleFormRocksDb.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormRocksDb.path = this.checkedDataPath;
        this.ruleFormRocksDb.mimeType = resultDatas.mimeType.toUpperCase();
      } else {
        return;
      }
    },
    // 影像服务处理Arcgis
    async imageServiceTpk() {
      this.ruleForm[0] = true;
      const resultDatas = await getTpkInfo(encodeURI(this.checkedDataPath));
      // 将获取数据赋给ruleFormImgSql
      if(resultDatas){
        if(this.$refs['ruleFormImgSql']){
          this.$refs['ruleFormImgSql'].clearValidate();
        }
        this.ruleFormImgSql = resultDatas;
        this.ruleFormImgSql.path = this.checkedDataPath;
        this.ruleFormImgSql.mimeType = resultDatas.mimeType.toUpperCase();
      } else {
        return;
      }
    },
    // 影像服务处理Grst
    async imageServiceGrst() {
      this.ruleForm[0] = true;
      const resultDatas = await getGrstInfo(encodeURI(this.checkedDataPath));
      // 将获取数据赋给ruleFormImgSql
      if(resultDatas){
        if(this.$refs['ruleFormImgSql']){
          this.$refs['ruleFormImgSql'].clearValidate();
        }
        resultDatas.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormImgSql = resultDatas;
        //this.ruleFormImgSql.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormImgSql.path = this.checkedDataPath;
        this.ruleFormImgSql.mimeType = resultDatas.mimeType.toUpperCase();
      } else {
        return;
      }
    },
    //影像服务处理Huarui IDB数据
    async imageServiceIDB() {
      this.ruleForm[0] = true;
      const resultDatas = await getHuaruiDataInfo(encodeURI(this.checkedDataPath));
      if (resultDatas) {
        if (this.$refs['ruleFormImgSql']) {
          this.$refs['ruleFormImgSql'].clearValidate();
        }
        if (!resultDatas.layerName) {
          resultDatas.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        }
        this.ruleFormImgSql = resultDatas;
        // this.ruleFormImgSql.layerName= this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
        this.ruleFormImgSql.path = this.checkedDataPath;
      } else {
        return;
      }
    },
    // 时序影像服务
    async timeImageService() {
      if (this.dataSourceType === 'GV HBase(History)') {
        this.ruleForm[2] = true;
        if(this.showHBaseListTable.length > 0){
          this.ruleFormHBase = this.showHBaseListTable[0];
          this.ruleFormHBase.mimeType = this.showHBaseListTable[0].mimeType;
          this.ruleFormHBase.layerName = this.showHBaseListTable[0].layerName;
        }
      } else{
          this.ruleForm[0] = true;
          const resultDatas = await getTMbtilesDataInfo(encodeURI(this.checkedDataPath));
          // 将获取数据赋给ruleFormImgSql
          if (resultDatas) {
            if (this.$refs['ruleFormImgSql']) {
              this.$refs['ruleFormImgSql'].clearValidate();
            }
            if (!resultDatas.layerName) {
              resultDatas.layerName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
            }
            this.ruleFormImgSql = resultDatas;
            this.ruleFormImgSql.path = this.checkedDataPath;
          } else {
            return;
          }
      }      
    },
    // 地形服务
    async demServiceMbtiles() {
      this.ruleForm[4] = true;
      const terrainParams = await getMbtilesDataInfo(encodeURI(this.checkedDataPath));
      this.ruleFormTerrain = terrainParams;
      this.ruleFormTerrain.path = this.checkedDataPath;
      this.ruleFormTerrain.mimeType = 'TERRAIN';
    },
    // 地形服务
    async demServiceGrst() {
      this.ruleForm[4] = true;
      const terrainParams = await getGrstInfo(encodeURI(this.checkedDataPath));
      this.ruleFormTerrain = terrainParams;
      this.ruleFormTerrain.path = this.checkedDataPath;
      // this.ruleFormTerrain.mimeType = 'TERRAIN';
    },
    // 地形服务
    async demServiceTif() {
      this.ruleForm[4] = true;
      const terrainParams = await getTerrainLayerInfo(encodeURI(this.checkedDataPath));
      this.ruleFormTerrain = terrainParams;
      this.ruleFormTerrain.path = this.checkedDataPath;
      this.ruleFormTerrain.minLevel = terrainParams.result.min;
      this.ruleFormTerrain.maxLevel = terrainParams.result.max;
      this.ruleFormTerrain.gridSet = 'EPSG:4326';
      this.ruleFormTerrain.mimeType = 'TERRAIN';
    },    
    // 倾斜摄影服务
    async tilePhotoService() {
      this.ruleForm[5] = true;
      const isSure = await fileIsExist(this.checkedDataPath, this.tilePhotoTypeCheck());
      if (!isSure && this.dataSourceType !== '3DTiles(Grid)') {
        this.$message.warning({ message: '数据格式不正确，请重新选择！', showClose: true });
        return;
      }      
      this.ruleFormTilePhoto.dir = this.checkedDataPath;
      if (this.serverType.resultInfo === 'WindowsSingleVersion') {
        this.ruleFormTilePhoto.name = this.checkedDataPath.split('\\')[this.checkedDataPath.split('\\').length - 1];
      } else {
        this.ruleFormTilePhoto.name = this.checkedDataPath.split('/')[this.checkedDataPath.split('/').length - 1];
      }
      if (this.dataSourceType === 'OSGB') {
        this.ruleFormTilePhoto.format = 'OSGB';
        this.ruleFormTilePhoto.name = this.ruleFormTilePhoto.name + '-OSGB';
        const lonLat = await resolveOsgbInfo(this.checkedDataPath, 'OSGB');
        this.ruleFormTilePhoto.longitude = lonLat.longitude;
        this.ruleFormTilePhoto.latitude = lonLat.latitude;        
        this.ruleFormTilePhoto.altitude = lonLat.altitude;  
      } else if (this.dataSourceType === '3DTiles') {
        this.ruleFormTilePhoto.format = 'B3DM';
        this.ruleFormTilePhoto.name = this.ruleFormTilePhoto.name + '-B3DM';
        this.ruleFormTilePhoto.longitude = '0';
        this.ruleFormTilePhoto.latitude = '0';
        this.ruleFormTilePhoto.altitude = '0';
      } else if (this.dataSourceType === '3DTiles(Grid)') {
        this.ruleFormTilePhoto.format = 'B3DM_GRID';
        this.ruleFormTilePhoto.name = this.ruleFormTilePhoto.name + '-B3DM_GRID';
        this.ruleFormTilePhoto.longitude = '0';
        this.ruleFormTilePhoto.latitude = '0';
        this.ruleFormTilePhoto.altitude = '0';
      }
    },
    // 街景
    async streetViewService() {
      this.ruleForm[7] = true;
      const streetParams = await resolveStreetInfo(encodeURI(this.checkedDataPath));
      if (!streetParams.svName) {
        streetParams.svName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
      }
      streetParams.dir = this.checkedDataPath;
      this.ruleFormStreet = streetParams;
      //this.ruleFormStreet.svName = this.checkedDataPath.split("/")[this.checkedDataPath.split("/").length-1];
      //this.ruleFormStreet.dir = this.checkedDataPath;
    },
    tilePhotoTypeCheck() {
      if (this.dataSourceType === 'OSGB') {
        return 'OSGB';
      } else if (this.dataSourceType === '3DTiles') {
        return 'B3DM';
      } else if (this.dataSourceType === '3DTiles(Grid)') {
        return 'B3DM_GRID';
      }
    },
    // 上一步
    prevStep() {
      if (this.active-- < 1) this.active = 0; this.disabled = false;
      if (this.active === 2) this.active = 1;
      this.stepModule = [false, false, false];
      this.stepModule[this.active] = true;
      this.isPublish = [true, false, false];
    },
    // 下一步
    nextStep() {
      // 选择数据
      if ((this.dataSourceType !== 'GV HBase' || this.dataSourceType != 'GV HBase(History)') && !this.checkedDataPath) {
        this.$message.warning({ message: '请选择数据', showClose: true });
        return;
      } else if (this.dataSourceType === 'GV HBase' && this.showHBaseListTable.length === 0) {
         this.$message.warning({ message: '请选择数据', showClose: true });
        return;
      }
      if (this.active === 0) {
        if (this.serviceType === '基础影像服务' ) {
          this.checkSourceType();
        } else if (this.serviceType === '时序影像服务' || this.serviceType === '影像服务') {
          this.checkSourceType1();// 主要用于避开静态检测过多判断的问题
        } else if (this.serviceType === '地形服务') {
          this.checkSourceType3();// 主要用于避开静态检测过多判断的问题
        } else {
          this.checkSourceType2();
        }
      }
    },
    // 进入发布列表
    gotoPublishList() {
      this.active = 0;
      this.disabled = false;
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.stepModule = [true, false, false];
      this.isPublish = [true, false, false];
      this.showHBaseList = false;
      if (this.serviceType === '地形服务') {
        this.$emit('goBackDem');
      } else if(this.serviceType === '影像服务'){
        this.$emit('goBackImage');
      } else if(this.serviceType === '倾斜摄影服务'){
        this.$emit('goBackTilePhoto');
      } else if(this.serviceType === '时序影像服务'){
        this.$emit('goBackTimeImage');
      } else if(this.serviceType === '街景'){
        this.$emit('goBackStreetView');
      } else {
        this.$emit('goBackBaseImg');
      }
    },    
    addTab(tabObject, fileDalias) {
      const tableDataOne = [];
      Object.keys(tabObject).forEach((key) => {
        if(fileDalias[key] === '层级范围'){
          tableDataOne.push({ name: fileDalias[key], value: tabObject.minLevel + '-' +  tabObject.maxLevel });
        } else if (fileDalias[key]) {
          tableDataOne.push({ name: fileDalias[key], value: tabObject[key] });
        }
      });
      this.tableDatas = tableDataOne;
    },
    // 返回
    goBack() {
      this.active = 0;
      this.disabled = false;
       this.isPublish = [true, false, false];
      this.checkedDataPath = '';
      this.checkedDataRealPath = '';
      this.stepModule = [true, false, false];
      this.showHBaseList = false;
      this.$emit('goBack');
    },
  },
  components: {
    ServerDirectoryDialog,
    DataMnagerDirectory,
  },
};
</script>

<style lang="scss">
.publish-service-componment{
  .publish-service-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ecebeb;
    padding-left: 25px;
    ul {
      li {
        a {
          display: inline-block;
          color: #606060;
        }
        float: left;
        font-size: 18px;
        font-weight: 700;
        line-height: 50px;
        cursor: pointer;
        i {
          font-weight: 700;
          color: #606060;
        }
      }
    }
  }
  .publish-service-select {
    height: 60px;
    padding-left: 25px;
    line-height: 60px;
    border-bottom: 1px solid #ecebeb;
    .el-select {
      width: 170px !important;
      margin-right: 20px;
    }
    .el-input--small .el-input__inner {
      height: 32px !important;
      line-height: 32px !important;
    }
  }
  .publish-service-main {
    padding-left: 155px;
    height: calc(100vh - 213px);
    overflow: hidden;
    .publish-service-main-content {
      width: calc((100vw / 100 * 60) - 200px);
    }
    .el-table__body, .el-table__footer, .el-table__header {
      width: 100% !important;
    }
    .el-table th.is-left {
      padding-left: 0px !important;
    }
    >div {
      > img {
        margin: 20px 0px;
      }
    }
    .el-dialog__body {
      text-align: center;
      padding: 20px 20px 15px 20px;
    }
    .el-dialog__header {
      padding: 0px;
      background: #0c8bde;
      text-align: left;
      padding-left: 20px;
      line-height: 50px;
      .el-dialog__title {
        color: white;
      }
      .el-dialog__headerbtn {
        top: 16px;
        .el-dialog__close {
          color: white;
        }
      }
    }
    h1 {
      font-size: 36px;
      color: #24A5F8;
      i {
        color: #67c23a;
        margin-right: 16px;
        font-size: 27px !important;
      }
    }
    .publish-service-hbase {
      .hbase-title {
        font-size: 16px;
        text-align: left;
        margin-left: 12px;
        margin-bottom: 10px;
        .hbase-title-content {
          float: left;
          width: 70%;
        }
        .hbase-title-search {
          float: right;
          width: 30%;
          margin-bottom: 10px;
          padding-left: 10px;
        }
      }
      .published-services {
        border-top: 1px solid #dcdcdc;
      }
      .el-dialog .el-table__body-wrapper {
        height: calc(100vh - 461px);
        overflow-y: auto;
        min-height: 284px;
      }
      .el-dialog__footer {
        padding: 0px 0px 15px 0px;
      }
      .dialog-footer {
        .el-button {
          vertical-align: bottom;
        }
      }
    }
    .el-steps--horizontal {
      width: calc((100vw / 100 * 60) - 200px);
      margin: 20px 0px 20px 0px;;
    }
    .el-step__icon {
      width: 35px;
      height: 35px;
    }
    .el-step__icon.is-text {
      border-width: 2px;
    }
    .el-step.is-horizontal .el-step__line {
      top: 17px;
    }
    .el-step__icon-inner {
      font-size: 23px;
    }
    .el-table .cell {
      line-height: 30px;
      font-size: 13px;
    }
    .tableDatas-success .el-table__body-wrapper {
      height: calc(100vh - 380px);
      overflow-y: auto; 
    }
    .el-form {
      height: calc(100vh - 316px);
      overflow-y: auto;
    }  
    .hBasePublishLayerListDetails {
      font-size: 14px;
      padding-top: 15px;
      tr td:first-of-type {
        width: 100px;
        color: #453e3e;
        font-weight: 700;
      }
      tr td {
        padding-top: 15px;
      }
    }
    .el-step__title.is-wait, .el-step__title.is-process, .el-step__title.is-success{
      margin-left: -12px;
    }
    .publish-data-layer-name {
      .el-input {
        width: 450px !important;
      }
    }
    .publish-data-level {
      .el-input {
        width: 125px !important;
      }
      // .el-form-item__content {
      //   margin-left: 45px !important;
      // }
    }
    .publishService-Params {
      width: 100%;
      .el-form-item__label{
        text-align: left;
        color: #303133;
        font-weight: 700;
      }
      .el-input {
        width: 225px;
      }
      .path-overline .el-form-item__content {
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .publish-layerGroups-result {
      color: #409EFF;
      line-height: 23px;
      
    }
    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      float: right;
      margin-right: 15px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .el-step.is-horizontal .el-step__line {
    left: 50px;
    right: 20px;
  }
  .publish-service-footer {
    text-align: center;
    padding-right: 30%;
    padding-left: 155px;
  }
}
</style>
