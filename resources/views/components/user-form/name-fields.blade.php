<div class="form-group">
    <label for="first_name">First name</label>
    <input type="text" class="form-control" name="first_name" id="first_name" required value="{{ old('first_name') }}">
</div>
<div class="form-group">
    <label for="middle_name">Middle name (optional)</label>
    <input type="text" class="form-control" name="middle_name" id="middle_name" value="{{ old('middle_name') }}">
</div>
<div class="form-group">
    <label for="last_name">Last name</label>
    <input type="text" class="form-control" name="last_name" id="last_name" required value="{{ old('last_name') }}">
</div>
