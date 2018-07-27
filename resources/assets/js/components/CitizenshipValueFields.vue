<template>

    <div class="panel-group">

        <div class="panel panel-default" v-for="(locationId, locationIndex) in selectedLocationIds" 
            :key="locationIndex"
            v-show="locationCanBeSelected(locationIndex)">
            <div class="panel-heading" role="tab" :id="formAttributeAsPhpArray('locationTab', locationIndex)">
                <h2 class="panel-title">
                    <a role="button" :aria-controls="formAttributeAsPhpArray('locationPanel', locationIndex)" @click="toggleLocation">
                        {{ locationDisplayName(locationIndex, locationId) }}
                    </a>
                </h2>
            </div>

            <div class="panel-collapse collapse" :id="formAttributeAsPhpArray('locationPanel', locationIndex)" role="tabpanel" :aria-labeledby="formAttributeAsPhpArray('locationTab', locationIndex)">
                <div class="panel-body">
                    <fieldset>

                        <div class="row">
                            <div class="col-md-6">
                                <select
                                    class="form-control"
                                    v-model="selectedLocationIds[locationIndex]"
                                    :name="formAttributeAsPhpArray('monitoringLocations', locationIndex)"
                                    :id="formAttributeAsPhpArray('monitoringLocations', locationIndex)"
                                >
                                    <option :value="null" disabled>Select a location</option>
                                    <optgroup v-for="(locations, categoryName) in monitoringLocationsByCategory" 
                                        :label="categoryName" :key="categoryName">
                                        <option 
                                            v-for="location in locations"
                                            :key="location.id"
                                            :value="location.id">
                                            {{ location.name }}
                                        </option>
                                    </optgroup>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model.lazy="locationLabels[locationIndex]"
                                    :name="formAttributeAsPhpArray('locationLabels', locationIndex)"
                                    :disabled="!locationId" placeholder="(Optional) Location label">
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- TODO: Generalize inline style into stylesheet! -->
                            <h3 class="col-md-12" style="font-size: 1em; margin-bottom: 0; padding-bottom: 0; padding-top: 0">Citizenship prompts</h3>
                            <fieldset class="col-md-12" :disabled="!locationId">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr v-for="(citizenshipValues, typeName) in citizenshipValuesByType" :key="typeName">
                                            <td>
                                                <label :for="formAttributeAsPhpArray('citizenshipValues', locationIndex, typeName)"></label>
                                                <select
                                                    class="form-control"
                                                    v-model="selectedPromptIds[locationIndex][typeName]"
                                                    :name="formAttributeAsPhpArray('citizenshipValues', locationIndex, typeName)"
                                                    :id="formAttributeAsPhpArray('citizenshipValues', locationIndex, typeName)"
                                                >
                                                    <option :value="null">Select {{ typeName }} prompt</option>
                                                    <option 
                                                        v-for="citizenshipValue in citizenshipValues" 
                                                        :key="citizenshipValue.id"
                                                        :value="citizenshipValue.id">
                                                        {{ citizenshipValue.phrasing }}
                                                    </option>
                                                </select>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    v-model.lazy="customPrompts[locationIndex][typeName]"
                                                    :name="formAttributeAsPhpArray('customPrompts', locationIndex, typeName)"
                                                    v-show="customPromptSelected(locationIndex, typeName)"
                                                    :disabled="!customPromptSelected(locationIndex, typeName)"
                                                    placeholder="E.g. Are you meeting your citizenship objective?">
                                            </td>
                                            <td>
                                                <div class="radio" title="Variable intervals do not guarantee a sample mean. Generated intervals may be as low as 33% and as high as 167% of the desired mean.">
                                                    <label >
                                                        <input
                                                            type="radio"
                                                            v-model="useVariableInterval[locationIndex][typeName]"
                                                            :value="true"
                                                            :name="formAttributeAsPhpArray('isVariableInterval', locationIndex, typeName)"
                                                            :disabled="!selectedPromptIds[locationIndex][typeName]">
                                                        Variable interval
                                                    </label>
                                                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                                                </div>
                                                <div class="radio">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            v-model="useVariableInterval[locationIndex][typeName]"
                                                            :value="false"
                                                            :name="formAttributeAsPhpArray('isVariableInterval', locationIndex, typeName)"
                                                            :disabled="!selectedPromptIds[locationIndex][typeName]">
                                                        Fixed interval
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div v-show="useVariableInterval[locationIndex][typeName]">
                                                    <label :for="formAttributeAsPhpArray('desiredMeanInSeconds', locationIndex, typeName)">
                                                        Desired mean interval
                                                    </label>
                                                    <select
                                                        v-show="useVariableInterval[locationIndex][typeName]"
                                                        class="form-control" :name="formAttributeAsPhpArray('desiredMeanInSeconds', locationIndex, typeName)"
                                                        :id="formAttributeAsPhpArray('desiredMeanInSeconds', locationIndex, typeName)"
                                                        :disabled="!selectedPromptIds[locationIndex][typeName]"
                                                    >
                                                        <option value selected>Select a desired mean</option>
                                                        <option value="30"  >30 seconds</option>
                                                        <option value="60"  >60 seconds</option>
                                                        <option value="120" >2 minutes</option>
                                                        <option value="180" >3 minutes</option>
                                                        <option value="300" >5 minutes</option>
                                                        <option value="600" >10 minutes</option>
                                                        <option value="1800">30 minutes</option>
                                                    </select>
                                                </div>
                                                <div v-show="!useVariableInterval[locationIndex][typeName]">
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <label :for="formAttributeAsPhpArray('intervalHours', locationIndex, typeName)">Hours</label>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label :for="formAttributeAsPhpArray('intervalMinutes', locationIndex, typeName)">Minutes</label>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <label :for="formAttributeAsPhpArray('intervalSeconds', locationIndex, typeName)">Seconds</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <select
                                                                class="form-control"
                                                                :name="formAttributeAsPhpArray('intervalHours', locationIndex, typeName)"
                                                                :id="formAttributeAsPhpArray('intervalHours', locationIndex, typeName)"
                                                                :disabled="!selectedPromptIds[locationIndex][typeName]"
                                                            >
                                                                <!-- v-for range starts at 1 -->
                                                                <option v-for="i in 25" :key="i">{{ i - 1 }}</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <select
                                                                class="form-control"
                                                                :name="formAttributeAsPhpArray('intervalMinutes', locationIndex, typeName)"
                                                                :id="formAttributeAsPhpArray('intervalMinutes', locationIndex, typeName)"
                                                                :disabled="!selectedPromptIds[locationIndex][typeName]"
                                                            >
                                                                <!-- v-for range starts at 1 -->
                                                                <option 
                                                                    v-for="i in 60"
                                                                    :key="i"
                                                                    >
                                                                    {{ i - 1 }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <select
                                                                class="form-control"
                                                                :name="formAttributeAsPhpArray('intervalSeconds', locationIndex, typeName)"
                                                                :id="formAttributeAsPhpArray('intervalSeconds', locationIndex, typeName)"
                                                                :disabled="!selectedPromptIds[locationIndex][typeName]"
                                                            >
                                                                <!-- v-for range starts at 1 -->
                                                                <option v-for="i in 60" :key="i">{{ i - 1 }}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <label :for="formAttributeAsPhpArray('goals', locationIndex, typeName)">Goal %</label>
                                                <select
                                                        class="form-control"
                                                        :name="formAttributeAsPhpArray('goals', locationIndex, typeName)"
                                                        :id="formAttributeAsPhpArray('goals', locationIndex, typeName)"
                                                        :disabled="!selectedPromptIds[locationIndex][typeName]"
                                                >
                                                    <option value selected>No goal</option>
                                                    <option value="50"  >50%</option>
                                                    <option value="55"  >55%</option>
                                                    <option value="60"  >60%</option>
                                                    <option value="65"  >65%</option>
                                                    <option value="70"  >70%</option>
                                                    <option value="75"  >75%</option>
                                                    <option value="80"  >80%</option>
                                                    <option value="85"  >85%</option>
                                                    <option value="90"  >90%</option>
                                                    <option value="95"  >95%</option>
                                                    <option value="100" >100%</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>

                            <div class="clearfix"></div>
                        </div>

                    </fieldset>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        props: [
            'citizenshipValuesByType',
            'monitoringLocationNamesById',
            'monitoringLocationsByCategory'
        ],

        created() {
            // Set up non-reactive properties
            this.maxNumberOfLocations = 10;

            // Initialize location data structs
            for (let i = 0; i < this.maxNumberOfLocations; i++) {
                this.selectedLocationIds.push(null);
                this.locationLabels.push(null);
                // TODO: Consider pulling these citizenship value types from the props instead of hard-coded, vis-à-vis data model changes
                this.selectedPromptIds.push({
                    Engagement      : null,
                    Appropriateness : null,
                    Comprehension   : null
                });
                this.customPrompts.push({
                    Engagement      : null,
                    Appropriateness : null,
                    Comprehension   : null
                });
                this.useVariableInterval.push({
                    Engagement      : true,
                    Appropriateness : true,
                    Comprehension   : true
                });
                this.goalPercent.push({
                    Engagement      : null,
                    Appropriateness : null,
                    Comprehension   : null
                });
            }
        },

        data() {
            return {
                selectedLocationIds: [],
                locationLabels: [],
                selectedPromptIds: [],
                customPrompts: [],
                goalPercent: [],
                useVariableInterval: []
            };
        },

        methods: {
            // Vue does not support string interpolation for unbound attributes, so we must use binding to generate the correct attribute values
            // TODO: Clarify the structure/naming scheme
            formAttributeAsPhpArray(primaryName, key1, key2) {
                // key1 is required, key2 is optional. TODO: Generalize this
                let value = `${primaryName}[${key1}]`;
                if (key2) {
                    value += `[${key2}]`;
                };
                return value;
            },

            toggleLocation(event) {
                if (event.target.hasAttribute('aria-controls')) {
                    // Assumption: aria-controls has only one id (cf. WAI-ARIA ID reference lists)
                    const targetPanelId = event.target.getAttribute('aria-controls');

                    // Note that our elements tend to have brackets in their names/ids (see formAttributesAsPhpArray)
                    // Without escaping them, jQuery interprets the brackets as attribute selectors
                    // This is cleaner :)
                    $(document.getElementById(targetPanelId)).collapse('toggle');
                }
            },

            locationCanBeSelected(index) {
                // Determine whether a particular location index can be selected in an effort to ensure user interacts
                // with locations form elements "in order" (1 before 2 before … before this.maxNumberOfLocations)
                // Note that order can't be guaranteed and should be validated server-side if needed

                let nextAvailableIndex = this.selectedLocationIds.indexOf(null);
                if (nextAvailableIndex === - 1) {
                    // Special case: full list means everything is enabled
                    return true;
                }
                return index <= nextAvailableIndex;
            },

            locationDisplayName(index, locationId) {
                if (!locationId) {
                    return '+ Select a location to enable monitoring';
                }

                // If a custom location label is given, show that alongside the generic location name
                const genericName = this.monitoringLocationNamesById[locationId];
                return 'Monitoring: ' +
                    (this.locationLabels[index] ? `${this.locationLabels[index]} (${genericName})` : genericName);
            },

            customPromptSelected(locationIndex, typeName) {
                // Determine if a custom prompt has been selected for this location and citizenship value type
                // TODO: Don't use hard-coded ids for comparison!! At least use a reverse lookup on phrasing?
                const promptId = this.selectedPromptIds[locationIndex][typeName];
                return promptId == 4 || promptId == 5 || promptId == 6;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .panel-group {
        min-height: 265px;
        max-height: 265px;
        overflow-y: scroll;
        font-size: .5em;        
    }
</style>

