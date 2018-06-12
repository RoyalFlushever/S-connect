<template>
    <div class="form-group">
        <label for="student-list-available" class="col-md-6 control-label-left">Available</label>
        <label for="student-list-assigned" class="col-md-6 control-label-left">Assigned</label>

        <div class="col-md-5">
            <select v-model="availableSelectedIds" id="student-list-available" multiple size=7 class="form-control">
                <option v-for="student in available" :value="student.id">{{ student.full_name }}</option>
            </select>
        </div>

        <div class="col-md-1">
            <button type="button" class="btn btn-default btn-sm btn-block" title="All right" @click="moveAllRight" :disabled="allRightDisabled">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Add all available children</span>
            </button>
            <button type="button" class="btn btn-default btn-sm btn-block" title="Move right" @click="moveSomeRight" :disabled="someRightDisabled">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Add selected children</span>
            </button>
            <button type="button" class="btn btn-default btn-sm btn-block" title="Move left" @click="moveSomeLeft" :disabled="someLeftDisabled">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Remove selected children</span>
            </button>
            <button type="button" class="btn btn-default btn-sm btn-block" title="All left" @click="moveAllLeft" :disabled="allLeftDisabled">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <span class="sr-only">Remove all children</span>
            </button>
        </div>

        <div class="col-md-5">
            <select v-model="assignedSelectedIds" id="student-list-assigned" name="student-list-assigned[]" multiple size=7 class="form-control">
                <option v-for="student in assigned" :value="student.id">{{ student.full_name }}</option>
            </select>
        </div>

        <div class="clearfix"></div>
    </div>
</template>

<script>
    export default {
        created() {
            // Set up non-reactive properties/methods
            this.findStudentIndexById = (studentArr, id) => {
                for (let i = 0; i < studentArr.length; i++) {
                    if (studentArr[i].id === id) {
                        return i;
                    }
                }
                return -1;
            };

            // Remove an item, specified by id, from an array
            this.removeFrom = (studentArr, id) => {
                const index = this.findStudentIndexById(studentArr, id);
                if (index !== -1) {
                    return studentArr.splice(index, 1)[0];
                }
            };

            // Move `sourceSelection` from `source` into `destination` and `destinationSelection`.
            // See export methods below { moveSomeRight() and moveSomeLeft() }
            this.moveSome = (sourceSelection, destinationSelection, source, destination) => {
                let selectedIds = sourceSelection.splice(0);
                let toMove = [];
                selectedIds.forEach(studentId => {
                    toMove.push(this.removeFrom(source, studentId));
                });
                destination.push(...toMove);

                // Select the values once they're on the other side
                destinationSelection.push(...selectedIds);

                return selectedIds;
            };

            // Track available options based on supplied initial prop
            this.available = this.availableStudents;
        },

        props: [
            'availableStudents'
        ],

        data() {
            return {
                available: [],
                assigned: [],
                availableSelectedIds: [],
                assignedSelectedIds: []
            };
        },

        computed: {
            allRightDisabled() {
                return this.available.length === 0;
            },

            allLeftDisabled() {
                return this.assigned.length === 0;
            },

            someRightDisabled() {
                return this.availableSelectedIds.length === 0;
            },

            someLeftDisabled() {
                return this.assignedSelectedIds.length === 0;
            }
        },

        methods: {
            moveAllRight() {
                // Select all, then move
                this.availableSelectedIds = this.available.map(student => student.id);
                this.moveSome(this.availableSelectedIds, this.assignedSelectedIds, this.available, this.assigned);
            },

            moveAllLeft() {
                // Select all, then move
                this.assignedSelectedIds = this.assigned.map(student => student.id);
                this.moveSome(this.assignedSelectedIds, this.availableSelectedIds, this.assigned, this.available);
            },

            moveSomeRight() {
                this.moveSome(this.availableSelectedIds, this.assignedSelectedIds, this.available, this.assigned);
            },

            moveSomeLeft() {
                this.moveSome(this.assignedSelectedIds, this.availableSelectedIds, this.assigned, this.available);
            }
        }
    };
</script>
