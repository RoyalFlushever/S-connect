<template>
    <div class="container gray-border">
        <h1 class="text-center report-title">Demographic Report</h1>
        <div class="row list-wrapper" v-if="this.role == 2">
            <div class="form-group col-md-2 col-md-offset-2">
                <select name="school level" id="school_level">
                    <option value="0">School Level(No Selected)</option>
                </select>
            </div>
            <div class="form-group col-md-2 col-md-offset-2">
                <select name="school name" id="school_name">
                    <option value="0">School Name(No Selected)</option>
                </select>
            </div>
        </div>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option">
                <h3 class="text-center">Select Mentors</h3>
                <div class="gray-border"></div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Select Students</h3>
                <div class="gray-border"></div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Report Options</h3>
                <div class="gray-border"></div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Export Format</h3>
                <div class="gray-border"></div>
            </div>
        </div>
        <hr>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large reselect">Re-select</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large btn-blue preview action">Preview Report</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large print action">Print</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'role'
    ]
}
</script>

<style lang="scss">
    .homeheading {
        margin-bottom: 20px;
    }
</style>

<style lang="scss" scoped>
    .report-title {
        margin-bottom: 40px;
    }

    select {
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        border-radius: 0px;
        outline: 1px inset black;
        outline-offset: -1px;
    }

    .list-wrapper {
        margin: 20px;

        .list-option {
            padding: 0px 10px;

            h3 {
                font-size: 1.4em;
                font-weight: 600;
            }
            .gray-border {
                height: 200px;
                padding: 0px 10px;
            }

            button {
                display: block;
            }

            .reselect {
                margin: 20px 0px;
            }

            .preview {
                margin: 20px auto;
                padding: 5px 20px;
            }

            .print {
                margin: 20px auto;
                padding: 5px 70px;
            }
        }
    }


</style>


